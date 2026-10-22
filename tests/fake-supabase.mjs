// Minimal in-memory stand-in for the parts of supabase-js the server functions use,
// including the new-user trigger that creates a learner profile.
export function createFakeSupabase() {
  const tables = { profiles: [], training_records: [], audit_events: [] };
  const users = new Map();
  const tokens = new Map();
  let nextId = 1;

  function addUser(email, { fullName = '', role = 'learner', token } = {}) {
    const id = `00000000-0000-4000-8000-${String(nextId++).padStart(12, '0')}`;
    const user = { id, email, user_metadata: { full_name: fullName } };
    users.set(id, user);
    tables.profiles.push({ id, email, full_name: fullName, role });
    if (token) tokens.set(token, id);
    return user;
  }

  function builder(table) {
    let filters = [];
    let operation = { kind: 'select' };
    const matches = row => filters.every(filter => filter(row));
    const run = () => {
      const rows = tables[table];
      if (operation.kind === 'insert') {
        const added = [].concat(operation.rows).map(row => ({ version: 0, state: {}, signoffs: {}, signoff_details: {}, instructor_notes: '', summary: {}, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), ...row }));
        rows.push(...added);
        return { data: added, error: null };
      }
      if (operation.kind === 'upsert') {
        const exists = rows.find(row => row[operation.onConflict] === operation.row[operation.onConflict]);
        if (exists && operation.ignoreDuplicates) return { data: [], error: null };
        operation = { kind: 'insert', rows: [operation.row] };
        return run();
      }
      if (operation.kind === 'update') {
        const updated = rows.filter(matches);
        updated.forEach(row => Object.assign(row, operation.values));
        return { data: updated, error: null };
      }
      return { data: rows.filter(matches).map(row => ({ ...row })), error: null };
    };
    const api = {
      select() { return api; },
      eq(column, value) { filters.push(row => row[column] === value); return api; },
      not(column, operator, value) { filters.push(row => !(operator === 'is' && value === null && row[column] == null)); return api; },
      insert(rows) { operation = { kind: 'insert', rows }; return api; },
      upsert(row, options = {}) { operation = { kind: 'upsert', row, onConflict: options.onConflict, ignoreDuplicates: options.ignoreDuplicates }; return api; },
      update(values) { operation = { kind: 'update', values }; return api; },
      async maybeSingle() { const { data } = run(); return { data: data[0] || null, error: null }; },
      then(resolve, reject) { return Promise.resolve(run()).then(resolve, reject); }
    };
    return api;
  }

  const client = {
    from: builder,
    auth: {
      async getUser(token) {
        const id = tokens.get(token);
        return id ? { data: { user: users.get(id) }, error: null } : { data: { user: null }, error: new Error('invalid token') };
      },
      admin: {
        async generateLink({ type, email, options = {} }) {
          const existing = [...users.values()].find(user => user.email === email);
          if (type === 'invite' && existing) return { data: null, error: new Error('A user with this email address has already been registered') };
          if (type === 'recovery' && !existing) return { data: null, error: new Error('User not found') };
          const user = existing || addUser(email, { fullName: options.data?.full_name || '' });
          const link = `https://project.supabase.co/auth/v1/verify?type=${type}&token=t${client.links.length}&redirect_to=${encodeURIComponent(options.redirectTo || '')}`;
          client.links.push({ type, email, options, link });
          return { data: { user, properties: { action_link: link } }, error: null };
        },
        async inviteUserByEmail(email, options = {}) {
          if ([...users.values()].some(user => user.email === email)) return { data: null, error: new Error('A user with this email address has already been registered') };
          const user = addUser(email, { fullName: options.data?.full_name || '' });
          client.invites.push({ email, options });
          return { data: { user }, error: null };
        }
      }
    },
    invites: [],
    links: []
  };
  return { client, tables, addUser };
}
