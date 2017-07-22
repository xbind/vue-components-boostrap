import axios from 'axios'

const BASE_URL = 'http://localhost:3001'

function upload (formData) {
  // const url = `${BASE_URL}/photos/upload`
  const url = 'http://httpbin.org/post'
  return axios.post(url, formData, {
    onUploadProgress: function (e) {

      if (e.lengthComputable) {
        var percentCompleted = Math.round( (e.loaded * 100) / e.total );

        console.log(percentCompleted + '%')
      }
    }
  })
    .then((x) => {

      x => x.data
      x => x.map(img => Object.assign({}, img, {url: `${BASE_URL}/images/${img.id}`}))
      console.log(x)
    })

}

export { upload }