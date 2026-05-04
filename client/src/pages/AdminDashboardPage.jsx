import {
  Ban,
  LoaderCircle,
  LogOut,
  PencilLine,
  Save,
  ShieldCheck,
  Trash2,
  Users,
  UserRoundCog,
  X,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import CTASection from '../components/CTASection'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import { fetchApiWithFallback } from '../config/api'
import { useAuth } from '../providers/AuthProvider'

const initialCreateForm = {
  id: '',
  email: '',
  full_name: '',
  role: 'user',
}

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5 sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-white/[0.5] sm:text-sm">
            {label}
          </div>
          <div className="mt-3 text-3xl font-semibold text-white sm:text-[2rem]">{value}</div>
        </div>
        <div className="rounded-2xl border border-gold/30 bg-gold/10 p-3 text-gold">
          <Icon size={20} />
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ active, activeLabel, inactiveLabel }) {
  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.2em] ${
        active
          ? 'border-gold/30 bg-gold/10 text-gold'
          : 'border-white/10 bg-white/[0.03] text-white/[0.65]'
      }`}
    >
      {active ? activeLabel : inactiveLabel}
    </span>
  )
}

function formatDate(value) {
  if (!value) {
    return 'Nedefinit'
  }

  return new Intl.DateTimeFormat('ro-RO', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

export default function AdminDashboardPage() {
  const { user, profile, session, refreshProfile, logout } = useAuth()
  const [users, setUsers] = useState([])
  const [tickets, setTickets] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [draft, setDraft] = useState({})
  const [createForm, setCreateForm] = useState(initialCreateForm)
  const [loading, setLoading] = useState(true)
  const [statusMessage, setStatusMessage] = useState('')
  const [statusTone, setStatusTone] = useState('idle')

  const userId = user?.id

  async function adminRequest(path, options = {}) {
    const { payload } = await fetchApiWithFallback(path, {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.access_token || ''}`,
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    })

    return payload
  }

  async function callAdminApi(path, targetUserId) {
    await adminRequest(path, {
      method: 'POST',
      body: {
        userId: targetUserId,
      },
    })
  }

  async function loadUsers() {
    const payload = await adminRequest('/admin/dashboard')
    setUsers(payload.users ?? [])
    setTickets(payload.tickets ?? [])
    return payload.users ?? []
  }

  async function loadTickets() {
    const payload = await adminRequest('/admin/dashboard')
    setUsers(payload.users ?? [])
    setTickets(payload.tickets ?? [])
    return payload.tickets ?? []
  }

  async function loadAdminData() {
    if (!session?.access_token) {
      setLoading(false)
      setStatusTone('error')
      setStatusMessage('Sesiunea de admin nu este disponibila.')
      return
    }

    setLoading(true)

    try {
      const payload = await adminRequest('/admin/dashboard')
      setUsers(payload.users ?? [])
      setTickets(payload.tickets ?? [])
      await refreshProfile()
      setStatusTone('idle')
      setStatusMessage('')
    } catch (error) {
      console.error('Failed to load admin dashboard:', error)
      setStatusTone('error')
      setStatusMessage(error.message || 'Admin Dashboard nu poate fi incarcat complet.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void loadAdminData()
  }, [session?.access_token])

  const stats = useMemo(() => {
    const totalUsers = users.length
    const totalAdmins = users.filter((item) => item.role === 'admin').length
    const totalBanned = users.filter((item) => item.status === 'banned').length

    return {
      totalUsers,
      totalAdmins,
      totalBanned,
    }
  }, [tickets, users])

  function startEdit(targetUser) {
    setEditingId(targetUser.id)
    setDraft({
      full_name: targetUser.full_name ?? '',
      role: targetUser.role ?? 'user',
      status: targetUser.status ?? 'active',
    })
  }

  function cancelEdit() {
    setEditingId(null)
    setDraft({})
  }

  function updateUserRoleInState(targetUserId, nextRole) {
    setUsers((current) =>
      current.map((entry) => (entry.id === targetUserId ? { ...entry, role: nextRole } : entry)),
    )
  }

  async function saveEdit(targetUserId) {
    try {
      await adminRequest('/admin/users/sync', {
        method: 'POST',
        body: {
          id: targetUserId,
          full_name: draft.full_name?.trim() || null,
          role: draft.role,
          status: draft.status || 'active',
        },
      })

      await loadAdminData()
      cancelEdit()
      setStatusTone('success')
      setStatusMessage('Profilul utilizatorului a fost actualizat.')
    } catch (error) {
      console.error('Failed to update user:', error)
      setStatusTone('error')
      setStatusMessage(error.message || 'Actualizarea profilului a esuat.')
    }
  }

  async function toggleBan(targetUser) {
    if (targetUser.id === userId) {
      setStatusTone('error')
      setStatusMessage('Nu iti poti suspenda propriul cont din Admin Dashboard.')
      return
    }

    if (targetUser.status === 'banned') {
      setStatusTone('error')
      setStatusMessage('Utilizatorul selectat este deja banat.')
      return
    }

    if (!window.confirm(`Confirmi banarea contului ${targetUser.email}?`)) {
      return
    }

    try {
      await callAdminApi('/admin/ban-user', targetUser.id)

      await loadAdminData()
      setStatusTone('success')
      setStatusMessage('Contul a fost suspendat si login-ul a fost blocat.')
    } catch (error) {
      console.error('Failed to toggle ban:', error)
      setStatusTone('error')
      setStatusMessage(error.message || 'Operatiunea de ban a esuat.')
    }
  }

  async function promoteToAdmin(targetUser) {
    if (targetUser.role === 'admin') {
      setStatusTone('error')
      setStatusMessage('Utilizatorul selectat este deja admin.')
      return
    }

    if (!window.confirm(`Confirmi promovarea lui ${targetUser.email} la rolul de admin?`)) {
      return
    }

    try {
      await callAdminApi('/admin/make-admin', targetUser.id)

      updateUserRoleInState(targetUser.id, 'admin')
      await loadAdminData()
      setStatusTone('success')
      setStatusMessage('Utilizatorul a fost promovat la admin.')
    } catch (error) {
      console.error('Failed to promote user to admin:', error)
      setStatusTone('error')
      setStatusMessage(error.message || 'Promovarea la admin a esuat.')
    }
  }

  async function removeAdminRole(targetUser) {
    if (targetUser.id === userId) {
      setStatusTone('error')
      setStatusMessage('Nu iti poti elimina propriul rol de admin din Admin Dashboard.')
      return
    }

    if (targetUser.role !== 'admin') {
      setStatusTone('error')
      setStatusMessage('Utilizatorul selectat nu are rol de admin.')
      return
    }

    if (!window.confirm(`Confirmi eliminarea rolului de admin pentru ${targetUser.email}?`)) {
      return
    }

    try {
      await callAdminApi('/admin/remove-admin', targetUser.id)

      updateUserRoleInState(targetUser.id, 'user')
      await loadAdminData()
      setStatusTone('success')
      setStatusMessage('Rolul de admin a fost eliminat cu succes.')
    } catch (error) {
      console.error('Failed to remove admin role:', error)
      setStatusTone('error')
      setStatusMessage(error.message || 'Eliminarea rolului de admin a esuat.')
    }
  }

  async function deleteUser(targetUser) {
    if (targetUser.id === userId) {
      setStatusTone('error')
      setStatusMessage('Nu iti poti sterge propriul profil din Admin Dashboard.')
      return
    }

    if (!window.confirm(`Confirmi stergerea profilului pentru ${targetUser.email}?`)) {
      return
    }

    try {
      await adminRequest('/admin/users', {
        method: 'DELETE',
        body: {
          id: targetUser.id,
        },
      })

      await loadAdminData()
      setStatusTone('success')
      setStatusMessage('Profilul utilizatorului a fost sters.')
    } catch (error) {
      console.error('Failed to delete user:', error)
      setStatusTone('error')
      setStatusMessage(error.message || 'Stergerea profilului a esuat.')
    }
  }

  async function createProfile(event) {
    event.preventDefault()

    try {
      await adminRequest('/admin/users/sync', {
        method: 'POST',
        body: {
          id: createForm.id.trim(),
          email: createForm.email.trim(),
          full_name: createForm.full_name.trim() || null,
          role: createForm.role,
        },
      })

      setCreateForm(initialCreateForm)
      await loadAdminData()
      setStatusTone('success')
      setStatusMessage('Profilul a fost creat sau sincronizat cu succes.')
    } catch (error) {
      console.error('Failed to create profile:', error)
      setStatusTone('error')
      setStatusMessage(
        error.message ||
          'Crearea profilului a esuat. UUID-ul trebuie sa corespunda unui utilizator existent in auth.users.',
      )
    }
  }

  return (
    <div>
      <Seo
        title="Admin Dashboard NorthSideCrew"
        description="Gestionare utilizatori, conturi si bilete vandute pentru NorthSideCrew."
        path="/admin"
        ogTitle="Admin Dashboard NorthSideCrew"
        ogDescription="Zona de administrare NorthSideCrew pentru utilizatori si bilete vandute."
        image="https://northsidecrew.ro/home/northsidecrew-home-hero.jpg"
      />

      <PageHero
        eyebrow="Admin Area"
        title="Admin Dashboard"
        description="Gestionare utilizatori, conturi si bilete vandute"
      />

      <section className="section-space">
        <div className="container-shell space-y-6">
          {loading ? (
            <div className="panel flex min-h-[16rem] flex-col items-center justify-center gap-4 px-6 py-10 text-center">
              <LoaderCircle size={28} className="animate-spin text-gold" />
              <p className="max-w-xl text-base leading-7 text-white/[0.68] sm:text-lg sm:leading-8">
                Incarcam utilizatorii si biletele din zona de administrare.
              </p>
            </div>
          ) : null}

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard icon={Users} label="Total utilizatori" value={stats.totalUsers} />
            <StatCard icon={ShieldCheck} label="Admini" value={stats.totalAdmins} />
            <StatCard icon={Ban} label="Utilizatori banati" value={stats.totalBanned} />
          </div>

          {statusMessage ? (
            <div
              className={`rounded-[22px] border px-5 py-4 text-sm leading-6 sm:text-base ${
                statusTone === 'error'
                  ? 'border-red-300/20 bg-red-400/10 text-red-200'
                  : statusTone === 'success'
                    ? 'border-gold/30 bg-gold/10 text-gold'
                    : 'border-white/10 bg-white/[0.03] text-white/[0.72]'
              }`}
            >
              {statusMessage}
            </div>
          ) : null}

          <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
            <Reveal className="panel overflow-hidden p-5 sm:p-7 lg:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <span className="eyebrow">Administrare</span>
                  <h2 className="title-lg">Utilizatori</h2>
                </div>
                <button type="button" onClick={() => void loadAdminData()} className="button-secondary">
                  Reincarca
                </button>
              </div>

              <div className="mt-6 hidden overflow-hidden rounded-[24px] border border-white/10 xl:block">
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-sm text-white/[0.78]">
                    <thead className="bg-white/[0.03] text-[0.68rem] uppercase tracking-[0.2em] text-white/[0.45]">
                      <tr>
                        <th className="px-4 py-4">Email</th>
                        <th className="px-4 py-4">Nume</th>
                        <th className="px-4 py-4">Rol</th>
                        <th className="px-4 py-4">Status</th>
                        <th className="px-4 py-4">Creat</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((entry) => {
                        const isEditing = editingId === entry.id
                        const isSelf = entry.id === userId

                        return (
                          <tr key={entry.id} className="border-t border-white/10 align-top">
                            <td className="px-4 py-4">
                              <div className="text-white/[0.88]">{entry.email}</div>
                              <div className="mt-4 flex max-w-[28rem] flex-wrap gap-3">
                                {isEditing ? (
                                  <>
                                    <button
                                      type="button"
                                      onClick={() => void saveEdit(entry.id)}
                                      className="inline-flex items-center gap-2 rounded-full border border-gold/35 bg-gold/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-gold transition hover:bg-gold/15"
                                    >
                                      <Save size={14} />
                                      Save
                                    </button>
                                    <button
                                      type="button"
                                      onClick={cancelEdit}
                                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/[0.78] transition hover:border-gold/35 hover:text-gold"
                                    >
                                      <X size={14} />
                                      Cancel
                                    </button>
                                  </>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => startEdit(entry)}
                                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/[0.78] transition hover:border-gold/35 hover:text-gold"
                                  >
                                    <PencilLine size={14} />
                                    Edit
                                  </button>
                                )}
                                {entry.role !== 'admin' ? (
                                  <button
                                    type="button"
                                    onClick={() => void promoteToAdmin(entry)}
                                    className="inline-flex items-center gap-2 rounded-full border border-gold/35 bg-gold/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-gold transition hover:bg-gold/15"
                                  >
                                    <ShieldCheck size={14} />
                                    Make Admin
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    disabled={isSelf}
                                    onClick={() => void removeAdminRole(entry)}
                                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/[0.78] transition hover:border-gold/35 hover:text-gold disabled:cursor-not-allowed disabled:opacity-50"
                                  >
                                    <ShieldCheck size={14} />
                                    Remove Admin
                                  </button>
                                )}
                                <button
                                  type="button"
                                  disabled={isSelf || entry.status === 'banned'}
                                  onClick={() => void toggleBan(entry)}
                                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/[0.78] transition hover:border-gold/35 hover:text-gold disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                  <Ban size={14} />
                                  {entry.status === 'banned' ? 'Banned' : 'Ban'}
                                </button>
                                <button
                                  type="button"
                                  disabled={isSelf}
                                  onClick={() => void deleteUser(entry)}
                                  className="inline-flex items-center gap-2 rounded-full border border-red-300/15 bg-red-400/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-200 transition hover:border-red-300/35 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                  <Trash2 size={14} />
                                  Delete
                                </button>
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              {isEditing ? (
                                <input
                                  type="text"
                                  value={draft.full_name ?? ''}
                                  onChange={(event) =>
                                    setDraft((current) => ({
                                      ...current,
                                      full_name: event.target.value,
                                    }))
                                  }
                                  className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none focus:border-gold/[0.45]"
                                />
                              ) : (
                                entry.full_name || 'Nedefinit'
                              )}
                            </td>
                            <td className="px-4 py-4">
                              {isEditing ? (
                                <select
                                  value={draft.role ?? 'user'}
                                  onChange={(event) =>
                                    setDraft((current) => ({
                                      ...current,
                                      role: event.target.value,
                                    }))
                                  }
                                  disabled={isSelf}
                                  className="w-full rounded-2xl border border-white/10 bg-[#090909] px-4 py-3 text-white outline-none disabled:opacity-60"
                                >
                                  <option value="user">user</option>
                                  <option value="admin">admin</option>
                                </select>
                              ) : (
                                <StatusBadge active={entry.role === 'admin'} activeLabel="admin" inactiveLabel="user" />
                              )}
                            </td>
                            <td className="px-4 py-4">
                              {isEditing ? (
                                <label className="inline-flex items-center gap-3 text-sm">
                                  <input
                                    type="checkbox"
                                    checked={draft.status === 'banned'}
                                    disabled={isSelf}
                                    onChange={(event) =>
                                      setDraft((current) => ({
                                        ...current,
                                        status: event.target.checked ? 'banned' : 'active',
                                      }))
                                    }
                                  />
                                  Suspendat
                                </label>
                              ) : (
                                <StatusBadge
                                  active={entry.status === 'banned'}
                                  activeLabel="banat"
                                  inactiveLabel="activ"
                                />
                              )}
                            </td>
                            <td className="px-4 py-4 text-white/[0.58]">{formatDate(entry.created_at)}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-6 grid gap-4 xl:hidden">
                {users.map((entry) => {
                  const isEditing = editingId === entry.id
                  const isSelf = entry.id === userId

                  return (
                    <div key={entry.id} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <div className="text-sm font-semibold text-white">{entry.email}</div>
                          <div className="mt-1 text-sm text-white/[0.55]">{formatDate(entry.created_at)}</div>
                        </div>
                        <StatusBadge
                          active={entry.status === 'banned'}
                          activeLabel="banat"
                          inactiveLabel="activ"
                        />
                      </div>

                      <div className="mt-4 grid gap-4">
                        <label className="block text-sm">
                          <span className="mb-2 block text-[0.68rem] uppercase tracking-[0.2em] text-white/[0.45]">
                            Nume
                          </span>
                          {isEditing ? (
                            <input
                              type="text"
                              value={draft.full_name ?? ''}
                              onChange={(event) =>
                                setDraft((current) => ({
                                  ...current,
                                  full_name: event.target.value,
                                }))
                              }
                              className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none focus:border-gold/[0.45]"
                            />
                          ) : (
                            <div className="text-white/[0.78]">{entry.full_name || 'Nedefinit'}</div>
                          )}
                        </label>

                        <label className="block text-sm">
                          <span className="mb-2 block text-[0.68rem] uppercase tracking-[0.2em] text-white/[0.45]">
                            Rol
                          </span>
                          {isEditing ? (
                            <select
                              value={draft.role ?? 'user'}
                              onChange={(event) =>
                                setDraft((current) => ({
                                  ...current,
                                  role: event.target.value,
                                }))
                              }
                              disabled={isSelf}
                              className="w-full rounded-2xl border border-white/10 bg-[#090909] px-4 py-3 text-white outline-none disabled:opacity-60"
                            >
                              <option value="user">user</option>
                              <option value="admin">admin</option>
                            </select>
                          ) : (
                            <StatusBadge active={entry.role === 'admin'} activeLabel="admin" inactiveLabel="user" />
                          )}
                        </label>

                        {isEditing ? (
                          <label className="inline-flex items-center gap-3 text-sm text-white/[0.78]">
                            <input
                              type="checkbox"
                              checked={draft.status === 'banned'}
                              disabled={isSelf}
                              onChange={(event) =>
                                setDraft((current) => ({
                                  ...current,
                                  status: event.target.checked ? 'banned' : 'active',
                                }))
                              }
                            />
                            Suspendat
                          </label>
                        ) : null}
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {isEditing ? (
                          <>
                            <button type="button" onClick={() => void saveEdit(entry.id)} className="button-primary">
                              Save
                              <Save size={16} />
                            </button>
                            <button type="button" onClick={cancelEdit} className="button-secondary">
                              Cancel
                              <X size={16} />
                            </button>
                          </>
                        ) : (
                          <button type="button" onClick={() => startEdit(entry)} className="button-secondary">
                            Edit
                            <PencilLine size={16} />
                          </button>
                        )}
                        {entry.role !== 'admin' ? (
                          <button
                            type="button"
                            onClick={() => void promoteToAdmin(entry)}
                            className="button-secondary"
                          >
                            Make Admin
                            <ShieldCheck size={16} />
                          </button>
                        ) : (
                          <button
                            type="button"
                            disabled={isSelf}
                            onClick={() => void removeAdminRole(entry)}
                            className="button-secondary disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            Remove Admin
                            <ShieldCheck size={16} />
                          </button>
                        )}
                        <button
                          type="button"
                          disabled={isSelf || entry.status === 'banned'}
                          onClick={() => void toggleBan(entry)}
                          className="button-secondary disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {entry.status === 'banned' ? 'Banned' : 'Ban'}
                          <Ban size={16} />
                        </button>
                        <button
                          type="button"
                          disabled={isSelf}
                          onClick={() => void deleteUser(entry)}
                          className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-red-300/20 bg-red-400/10 px-5 py-3 text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-red-200 transition hover:border-red-300/35 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Delete
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Reveal>

            <Reveal delay={0.08} className="panel overflow-hidden p-5 sm:p-7 lg:p-8">
              <span className="eyebrow">Create / Sync</span>
              <h2 className="title-lg">Profil manual</h2>
              <p className="mt-4 text-sm leading-6 text-white/[0.68] sm:text-base sm:leading-7">
                Poti crea sau sincroniza manual un profil doar pentru un utilizator existent deja in
                <code> auth.users</code>. UUID-ul trebuie sa fie valid.
              </p>

              <form className="mt-6 space-y-4" onSubmit={createProfile}>
                <input
                  type="text"
                  value={createForm.id}
                  onChange={(event) => setCreateForm((current) => ({ ...current, id: event.target.value }))}
                  placeholder="UUID utilizator"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none focus:border-gold/[0.45]"
                />
                <input
                  type="email"
                  value={createForm.email}
                  onChange={(event) =>
                    setCreateForm((current) => ({ ...current, email: event.target.value }))
                  }
                  placeholder="Email"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none focus:border-gold/[0.45]"
                />
                <input
                  type="text"
                  value={createForm.full_name}
                  onChange={(event) =>
                    setCreateForm((current) => ({ ...current, full_name: event.target.value }))
                  }
                  placeholder="Nume complet"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none focus:border-gold/[0.45]"
                />
                <select
                  value={createForm.role}
                  onChange={(event) => setCreateForm((current) => ({ ...current, role: event.target.value }))}
                  className="w-full rounded-2xl border border-white/10 bg-[#090909] px-4 py-3 text-white outline-none"
                >
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                </select>
                <button type="submit" className="button-primary w-full">
                  Salveaza profil
                  <UserRoundCog size={16} />
                </button>
              </form>

              <div className="mt-6 rounded-[24px] border border-gold/20 bg-gold/10 p-5 text-sm leading-6 text-gold">
                Contul curent de admin: <strong>{profile?.email || user?.email}</strong>
              </div>

              <div className="mt-4 flex flex-col gap-3">
                <button type="button" onClick={logout} className="button-secondary w-full">
                  Log Out
                  <LogOut size={16} />
                </button>
              </div>
            </Reveal>
          </div>

        </div>
      </section>

      <CTASection
        eyebrow="Control complet"
        title="Admin Dashboard-ul tine utilizatorii si biletele sub control."
        description="Dupa rularea SQL-ului din proiect, ai administrare completa pentru roluri, suspendari si evidenta ticketelor."
        primaryLabel="Mergi in Dashboard"
        primaryTo="/dashboard"
        secondaryLabel="Vezi Evenimentele"
        secondaryTo="/events"
      />
    </div>
  )
}
