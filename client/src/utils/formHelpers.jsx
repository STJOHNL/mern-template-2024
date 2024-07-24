// Basic handle change for forms
export const handleChange = (e, setFormData, formData) => {
  const { name, value, type, checked } = e.target
  setFormData({
    ...formData,
    [name]: type === 'checkbox' ? checked : value,
  })
}

// Handle change for files
export const handleFileChange = (e, setFormData, formData) => {
  const file = e.target.files[0]
  const { name } = e.target
  setFormData({
    ...formData,
    [name]: file,
  })
}

// Handle change for CKEditor
export const handleEditorChange = (
  e,
  editor,
  setEditorData,
  setFormData,
  formData
) => {
  const data = editor.getData()
  setEditorData(data)
  setFormData({ ...formData, body: data })
}
