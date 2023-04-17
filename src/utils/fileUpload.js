import axios from 'axios'
import { NEXT_PUBLIC_APP_BACKEND_API_URL } from './config/config'
import { ACCESS_TOKEN } from './constants/constant'
import { getLocal } from './localstorage'
import { toast } from 'react-hot-toast'

export const fileUpload = async (path = 'test', file = null) => {
  // retrieve access token
  var token = getLocal(ACCESS_TOKEN)

  if (file) {
    // Create an object of formData
    const formData = new FormData()

    if (file.length > 1) {
      //  Multiple File Selection
      for (let i = 0; i < file.length; i++) {
        formData.append('file', file[i], file[i].name) // for multiple files
      }
      try {
        const response = await axios.post(`${NEXT_PUBLIC_APP_BACKEND_API_URL}/multi-file-upload`, formData, {
          headers: {
            Authorization: `${token}`
          }
        })

        const data = response.data
        toast.success(data?.status_message || 'File Upload Success')

        return data || { statusCode: 505 }
      } catch (error) {
        toast.error(error?.response?.data?.status_message || 'Something Went Wrong')

        return error?.response || { statusCode: 505 }
      }
    } else {
      // For Single File Selection - Update the formData object
      formData.append('file', file, file.name) // for single file

      try {
        // const response = await axios.post(`${NEXT_PUBLIC_APP_BACKEND_API_URL}/file-upload`, formData, {
        const response = await axios.post(`${NEXT_PUBLIC_APP_BACKEND_API_URL}/doc-file-upload`, formData, {
          headers: {
            Authorization: `${token}`
          }
        })
        const data = response.data
        toast.success(data?.status_message || 'File Upload Success')

        return data || { statusCode: 505 }
      } catch (error) {
        toast.error(error?.response?.data?.status_message || 'Something Went Wrong')

        return error?.response || { statusCode: 505 }
      }
    }
  }
}

export const isDocument = url => {
  const ext = url.split('.').pop()
  if (ext === 'pdf' || ext === 'doc' || ext === 'docx') {
    return { isDoc: true, type: ext }
  } else {
    return { isDoc: false, type: ext }
  }
}

// export const isMultiDocument = (url) => {
//   let ext = null;
//   url.map((url) => {
//     ext = url.split(".").pop();
//     if (ext === "pdf" || ext === "doc" || ext === "docx") {
//       return { isDoc: true, type: ext };
//     } else {
//       return { isDoc: false, type: ext };
//     }
//   });
// };

// export const acceptExtensions = 'application/pdf,application/doc,application/docx,image/jpg,image/png,image/jpeg'
// export const acceptWordsExtensions = {
//   // 'application/*': ['.xlsx', '.xls', '.csv']
//   // 'image/*': ['.png', '.jpg', '.jpeg', '.gif']
// };

export const acceptExtensions = {
  'video/*': ['.mp4']
}

// For Single File Upload
export const onFileUploadSuccess = ({ form, reset, accessKey, key, url }) => {
  const tempForm = {
    ...form,
    [key]: [...form?.[accessKey], ...url]
  }
  reset(tempForm)
}

// For multiple File Upload
// export const onMultiFileUploadSuccess = ({ form, reset, accessKey, key, url }) => {
//   const tempForm = {
//     ...form,
//     [key]: [...form?.[accessKey], ...url]
//   }
//   reset(tempForm)
// }
