const FileInput = () => {
  return (
    <div>
        <label className="label label-text" htmlFor="avatar">Select An Image File (Max 0.5 MB)</label>
        <input type="file" className="file-input file-input-sm file-input-bordered w-full" name="avatar" id="avatar" accept="image/*"/>
    </div>
  )
}
export default FileInput