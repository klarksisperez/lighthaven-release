import mongoose from 'mongoose';

const auditSchema = new mongoose.Schema(
    {
      designation: { type: String, required: true },
      title: { type: String, required: true },
      action: { type: String, required: true },
    },
    {
      timestamps: true,
    }
  );

  const AdminActivity = mongoose.model('AdminActivity', auditSchema);
  export default AdminActivity;