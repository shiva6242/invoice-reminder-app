const BASE = process.env.REACT_APP_API_URL;

export const fetchInvoices = async () => {
  const res = await fetch(`${BASE}/invoices`, { credentials: 'include' });
  return res.json();
};

export const triggerReminder = async (id) => {
  const res = await fetch(`${BASE}/invoices/remind/${id}`, {
    method: 'POST',
    credentials: 'include'
  });
  return res.json();
};

export const loginWithGoogle = () => {
  window.open(`${BASE}/auth/google`, "_self");
};

export const logout = () => {
  window.open(`${BASE}/auth/logout`, "_self");
};

export const getUser = async () => {
  const res = await fetch(`${BASE}/auth/me`, { credentials: 'include' });
  return res.json();
};
