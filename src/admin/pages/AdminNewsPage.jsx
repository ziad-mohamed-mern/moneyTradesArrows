import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, Loader2, Newspaper, AlertTriangle, FileText } from 'lucide-react';
import { newsService } from '../../services/api';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import toast from 'react-hot-toast';

// ─── News Form ────────────────────────────────────────────────────────────────
const NewsForm = ({ initial, onSubmit, loading }) => {
  const [title, setTitle] = useState(initial?.title || '');
  const [content, setContent] = useState(initial?.content || '');
  const isEdit = !!initial;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) { toast.error('يرجى إدخال عنوان الخبر'); return; }
    if (!content.trim()) { toast.error('يرجى إدخال محتوى الخبر'); return; }
    onSubmit({ title, content });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
          عنوان الخبر <span className="text-red-400">*</span>
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="أدخل عنوان الخبر..."
          className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm bg-white dark:bg-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-400 transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
          محتوى الخبر <span className="text-red-400">*</span>
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="أدخل تفاصيل ومحتوى الخبر كاملاً..."
          rows={6}
          className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm bg-white dark:bg-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-400 transition-all resize-none"
        />
        <p className="text-xs text-slate-400 mt-1">{content.length} حرف</p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-l from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 disabled:opacity-60"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
        {loading ? 'جاري الحفظ...' : isEdit ? 'حفظ التعديلات' : 'نشر الخبر'}
      </button>
    </form>
  );
};

// ─── Delete Confirm ───────────────────────────────────────────────────────────
const DeleteConfirm = ({ item, onConfirm, onCancel, loading }) => (
  <div className="text-center">
    <div className="w-14 h-14 bg-red-50 dark:bg-red-900/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
      <AlertTriangle className="w-7 h-7 text-red-500" />
    </div>
    <h4 className="font-bold text-slate-800 dark:text-white mb-2">تأكيد الحذف</h4>
    <p className="text-slate-500 text-sm mb-5">
      هل أنت متأكد من حذف الخبر{' '}
      <span className="font-semibold text-slate-700 dark:text-slate-200">"{item?.title}"</span>؟
    </p>
    <div className="flex gap-3">
      <button
        onClick={onCancel}
        className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
      >
        إلغاء
      </button>
      <button
        onClick={onConfirm}
        disabled={loading}
        className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-60 transition-all"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
        {loading ? 'جاري الحذف...' : 'حذف'}
      </button>
    </div>
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function NewsPage() {
  const qc = useQueryClient();
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const [addOpen, setAddOpen]       = useState(false);
  const [editItem, setEditItem]     = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);

  // ── Fetch ──
  const { data, isLoading, error } = useQuery({
    queryKey: ['news', page],
    queryFn: () => newsService.getAll(page, pageSize).then((r) => r.data),
    keepPreviousData: true,
  });

  const newsList = data?.data || data?.items || data?.news || (Array.isArray(data) ? data : []);
  const totalPages = data?.totalPages || Math.ceil((data?.totalCount || newsList.length) / pageSize) || 1;

  // ── Create ──
  const createMutation = useMutation({
    mutationFn: (d) => newsService.create(d),
    onSuccess: () => {
      qc.invalidateQueries(['news']);
      setAddOpen(false);
      toast.success('تم نشر الخبر بنجاح ✓');
    },
    onError: (err) => toast.error(err.response?.data?.message || 'فشل إضافة الخبر'),
  });

  // ── Update ──
  const updateMutation = useMutation({
    mutationFn: ({ id, ...d }) => newsService.update(id, d),
    onSuccess: () => {
      qc.invalidateQueries(['news']);
      setEditItem(null);
      toast.success('تم تعديل الخبر بنجاح ✓');
    },
    onError: (err) => toast.error(err.response?.data?.message || 'فشل تعديل الخبر'),
  });

  // ── Delete ──
  const deleteMutation = useMutation({
    mutationFn: (id) => newsService.delete(id),
    onSuccess: () => {
      qc.invalidateQueries(['news']);
      setDeleteItem(null);
      toast.success('تم حذف الخبر');
    },
    onError: (err) => toast.error(err.response?.data?.message || 'فشل حذف الخبر'),
  });

  // ── Columns ──
  const columns = [
    {
      key: 'title',
      label: 'العنوان',
      render: (val) => (
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0">
            <FileText className="w-4 h-4 text-blue-500" />
          </div>
          <span className="font-semibold text-slate-800 dark:text-white">{val}</span>
        </div>
      ),
    },
    {
      key: 'content',
      label: 'المحتوى',
      render: (val) => (
        <span className="text-slate-500 dark:text-slate-400 text-xs line-clamp-2 max-w-sm block">
          {val || '—'}
        </span>
      ),
    },
    {
      key: 'createdAt',
      label: 'تاريخ النشر',
      render: (val) => (
        <span className="text-xs text-slate-400 bg-slate-50 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
          {val ? new Date(val).toLocaleDateString('ar-SA', { year: 'numeric', month: 'short', day: 'numeric' }) : new Date().toLocaleDateString('ar-SA', { year: 'numeric', month: 'short', day: 'numeric' })}
        </span>
      ),
    },
  ];

  const actionButtons = (row) => (
    <>
      <button
        onClick={() => setEditItem(row)}
        className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 flex items-center justify-center transition-all"
        title="تعديل"
      >
        <Pencil className="w-3.5 h-3.5" />
      </button>
      <button
        onClick={() => setDeleteItem(row)}
        className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/40 flex items-center justify-center transition-all"
        title="حذف"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-5">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center">
            <Newspaper className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800 dark:text-white">الأخبار</h2>
            <p className="text-xs text-slate-400">
              {isLoading ? '...' : `${newsList.length} خبر`}
            </p>
          </div>
        </div>

        <button
          onClick={() => setAddOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-l from-amber-500 to-amber-400 hover:from-amber-600 hover:to-amber-500 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-95 shadow-lg shadow-amber-500/20"
        >
          <Plus className="w-4 h-4" />
          إضافة خبر
        </button>
      </motion.div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-xl p-4 text-red-600 dark:text-red-300 text-sm flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          فشل تحميل الأخبار: {error.message}
        </div>
      )}

      {/* Table */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <DataTable
          columns={columns}
          data={newsList}
          isLoading={isLoading}
          emptyMessage="لا توجد أخبار حتى الآن. أضف خبرك الأول!"
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          actions={actionButtons}
        />
      </motion.div>

      {/* Add Modal */}
      <Modal isOpen={addOpen} onClose={() => setAddOpen(false)} title="إضافة خبر جديد" size="md">
        <NewsForm onSubmit={(d) => createMutation.mutate(d)} loading={createMutation.isPending} />
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={!!editItem} onClose={() => setEditItem(null)} title="تعديل الخبر" size="md">
        {editItem && (
          <NewsForm
            initial={editItem}
            onSubmit={(d) => updateMutation.mutate({ id: editItem.id, ...d })}
            loading={updateMutation.isPending}
          />
        )}
      </Modal>

      {/* Delete Modal */}
      <Modal isOpen={!!deleteItem} onClose={() => setDeleteItem(null)} title="تأكيد الحذف" size="sm">
        <DeleteConfirm
          item={deleteItem}
          onConfirm={() => deleteMutation.mutate(deleteItem.id)}
          onCancel={() => setDeleteItem(null)}
          loading={deleteMutation.isPending}
        />
      </Modal>
    </div>
  );
}
