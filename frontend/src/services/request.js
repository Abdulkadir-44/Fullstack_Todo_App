function request(url, data = false, method = 'GET') {
    return new Promise((resolve, reject) => {
        const parsedUser = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'))
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json'
            }
        }

        if (parsedUser) {
            const token = parsedUser.accesToken
            options.headers.authorization = `Bearer ${token}`
        }
        
        if (data != null && (method == 'POST' || method == 'PUT' || method == 'PATCH')) {
            options.body = JSON.stringify(data)
            /*
            HTTP protokolünde, isteklerin gövdesi (body) düz bir metin formatında olmalıdır.
            Bu nedenle, fetch gibi bir yöntemle bir nesneyi veya diziyi göndermek istiyorsanız, bunu önce JSON formatına çevirmeniz gerekir.
            JSON.stringify, JavaScript nesnelerini string haline getirir ve bu da HTTP protokolünün kabul ettiği bir format haline gelir.
            */
        }

        try {
            fetch(url, options)
                .then(async res => {
                    if (res.ok) {
                        const data = await res.json()
                        return resolve(data)
                    } else {
                        const error = await res.json()
                        return reject(error)
                    }
                })
        } catch (error) {
            reject({ message: "Server error !", error })
        }

    })
}


export const post = (url, data) => request(url, data, 'POST');
export const get = (url) => request(url)
export const del = (url) => request(url, null, 'DELETE');
export const patch = (url, data) => request(url, data, 'PATCH');