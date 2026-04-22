import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import {
  Plus, Pencil, Trash2, Image as ImageIcon, Loader2,
  FolderKanban, X, Upload, AlertTriangle,
} from 'lucide-react';
import projectsService from '../../services/projectsService';
import { BASE_URL } from '../../services/api';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import toast from 'react-hot-toast';

// ─── Image Preview Component ──────────────────────────────────────────────────
/*
 * Gemini prompt for project images:
 * "Modern industrial construction project, professional lighting, high quality, aerial view"
 * "Technology startup office, modern interior, creative workspace, cinematic"
 * "Smart city infrastructure project, futuristic architecture, golden hour"
 */
const ImagePreview = ({ urls = [], size = 'sm' }) => {
  const dim = size === 'sm' ? 'w-10 h-10' : 'w-20 h-20';
  if (!urls?.length) return <span className="text-slate-300 text-xs">لا توجد صور</span>;
  return (
    <div className="flex gap-1 flex-wrap">
      {urls.slice(0, 3).map((url, i) => (
        <div key={i} className={`${dim} rounded-lg overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0`}>
          <img
            src={url.startsWith('http') ? url : `${BASE_URL}/${url}`}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </div>
      ))}
      {urls.length > 3 && (
        <div className={`${dim} rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-xs text-slate-400 font-semibold`}>
          +{urls.length - 3}
        </div>
      )}
    </div>
  );
};

// ─── File Upload Component ────────────────────────────────────────────────────
const FileUpload = ({ files, onChange }) => {
  const handleDrop = (e) => {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith('image/'));
    onChange([...files, ...dropped]);
  };
  const handleChange = (e) => {
    const selected = Array.from(e.target.files);
    onChange([...files, ...selected]);
  };
  const removeFile = (i) => onChange(files.filter((_, idx) => idx !== i));

  return (
    <div>
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => document.getElementById('file-input').click()}
        className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-6 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all"
      >
        <Upload className="w-8 h-8 mx-auto mb-2 text-slate-300" />
        <p className="text-sm text-slate-500">اسحب الصور هنا أو <span className="text-blue-500 font-medium">اختر من الجهاز</span></p>
        <p className="text-xs text-slate-400 mt-1">PNG, JPG, WEBP</p>
        <input id="file-input" type="file" multiple accept="image/*" className="hidden" onChange={handleChange} />
      </div>

      {files.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {files.map((f, i) => (
            <div key={i} className="relative w-16 h-16 rounded-xl overflow-hidden border border-slate-200 group">
              <img src={URL.createObjectURL(f)} alt="" className="w-full h-full object-cover" />
              <button
                onClick={() => removeFile(i)}
                className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Add/Edit Form ────────────────────────────────────────────────────────────
const ProjectForm = ({ initial, onSubmit, loading }) => {
  const [title, setTitle] = useState(initial?.title || '');
  const [description, setDescription] = useState(initial?.description || '');
  const [files, setFiles] = useState([]);
  const isEdit = !!initial;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) { toast.error('يرجى إدخال عنوان المشروع'); return; }
    onSubmit({ title, description, files });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
          عنوان المشروع <span className="text-red-400">*</span>
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="أدخل عنوان المشروع..."
          className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm bg-white dark:bg-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-400 transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
          وصف المشروع
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="أدخل وصف تفصيلي للمشروع..."
          rows={4}
          className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm bg-white dark:bg-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-400 transition-all resize-none"
        />
      </div>

      {!isEdit && (
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            صور المشروع
          </label>
          <FileUpload files={files} onChange={setFiles} />
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-l from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 disabled:opacity-60"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
        {loading ? 'جاري الحفظ...' : isEdit ? 'حفظ التعديلات' : 'إضافة المشروع'}
      </button>
    </form>
  );
};

// ─── Delete Confirmation ──────────────────────────────────────────────────────
const DeleteConfirm = ({ item, onConfirm, onCancel, loading }) => (
  <div className="text-center">
    <div className="w-14 h-14 bg-red-50 dark:bg-red-900/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
      <AlertTriangle className="w-7 h-7 text-red-500" />
    </div>
    <h4 className="font-bold text-slate-800 dark:text-white mb-2">تأكيد الحذف</h4>
    <p className="text-slate-500 text-sm mb-5">
      هل أنت متأكد من حذف المشروع <span className="font-semibold text-slate-700 dark:text-slate-200">"{item?.title}"</span>؟
      <br />لا يمكن التراجع عن هذا الإجراء.
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
        className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
        {loading ? 'جاري الحذف...' : 'حذف'}
      </button>
    </div>
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ProjectsPage() {
  const qc = useQueryClient();
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const [addOpen, setAddOpen]       = useState(false);
  const [editItem, setEditItem]     = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);

  // ── Fetch ──
  const { data, isLoading, error } = useQuery({
    queryKey: ['projects', page],
    queryFn: () => projectsService.getAll(page, pageSize).then((r) => r.data),
    keepPreviousData: true,
  });

  const projects = data?.data || data?.items || data?.projects || (Array.isArray(data) ? data : []);
  const totalPages = data?.totalPages || Math.ceil((data?.totalCount || projects.length) / pageSize) || 1;

  // ── Create ──
  const createMutation = useMutation({
    mutationFn: ({ title, description, files }) => {
      const fd = new FormData();
      fd.append('Title', title);
      fd.append('Description', description);
      files.forEach((f) => fd.append('Medias', f));
      return projectsService.create(fd);
    },
    onSuccess: () => {
      qc.invalidateQueries(['projects']);
      setAddOpen(false);
      toast.success('تمت إضافة المشروع بنجاح ✓');
    },
    onError: (err) => toast.error(err.response?.data?.message || 'فشل إضافة المشروع'),
  });

  // ── Update ──
  const updateMutation = useMutation({
    mutationFn: ({ id, title, description }) =>
      projectsService.update(id, { title, description }),
    onSuccess: () => {
      qc.invalidateQueries(['projects']);
      setEditItem(null);
      toast.success('تم تعديل المشروع بنجاح ✓');
    },
    onError: (err) => toast.error(err.response?.data?.message || 'فشل تعديل المشروع'),
  });

  // ── Delete ──
  const deleteMutation = useMutation({
    mutationFn: (id) => projectsService.delete(id),
    onSuccess: () => {
      qc.invalidateQueries(['projects']);
      setDeleteItem(null);
      toast.success('تم حذف المشروع');
    },
    onError: (err) => toast.error(err.response?.data?.message || 'فشل حذف المشروع'),
  });

  // ── Table Columns ──
  const columns = [
    {
      key: 'title',
      label: 'العنوان',
      render: (val) => (
        <span className="font-semibold text-slate-800 dark:text-white">{val}</span>
      ),
    },
    {
      key: 'description',
      label: 'الوصف',
      render: (val) => (
        <span className="text-slate-500 dark:text-slate-400 text-xs line-clamp-2 max-w-xs block">
          {val || '—'}
        </span>
      ),
    },
    {
      key: 'medias',
      label: 'الصور',
      render: (val, row) => {
        const urls = val || row.mediaUrls || row.images || [];
        return <ImagePreview urls={urls} />;
      },
    },
    {
      key: 'createdAt',
      label: 'تاريخ الإضافة',
      render: (val) =>
        val ? new Date(val).toLocaleDateString('ar-SA') : '—',
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
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
            <FolderKanban className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800 dark:text-white">المشاريع</h2>
            <p className="text-xs text-slate-400">
              {isLoading ? '...' : `${projects.length} مشروع`}
            </p>
          </div>
        </div>

        <button
          onClick={() => setAddOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-l from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-95 shadow-lg shadow-blue-500/20"
        >
          <Plus className="w-4 h-4" />
          إضافة مشروع
        </button>
      </motion.div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-xl p-4 text-red-600 dark:text-red-300 text-sm flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          فشل تحميل المشاريع: {error.message}
        </div>
      )}

      {/* Table */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <DataTable
          columns={columns}
          data={projects}
          isLoading={isLoading}
          emptyMessage="لا توجد مشاريع حتى الآن. أضف مشروعك الأول!"
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          actions={actionButtons}
        />
      </motion.div>

      {/* ── Add Modal ── */}
      <Modal
        isOpen={addOpen}
        onClose={() => setAddOpen(false)}
        title="إضافة مشروع جديد"
        size="md"
      >
        <ProjectForm
          onSubmit={(vals) => createMutation.mutate(vals)}
          loading={createMutation.isPending}
        />
      </Modal>

      {/* ── Edit Modal ── */}
      <Modal
        isOpen={!!editItem}
        onClose={() => setEditItem(null)}
        title="تعديل المشروع"
        size="md"
      >
        {editItem && (
          <ProjectForm
            initial={editItem}
            onSubmit={({ title, description }) =>
              updateMutation.mutate({ id: editItem.id, title, description })
            }
            loading={updateMutation.isPending}
          />
        )}
      </Modal>

      {/* ── Delete Modal ── */}
      <Modal
        isOpen={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        title="تأكيد الحذف"
        size="sm"
      >
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
