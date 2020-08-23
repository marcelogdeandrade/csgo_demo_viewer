const PROD_URL = "https://api.csdemos.com"
const LOCAL_URL = "http://back.marcelao.com.br"

export const fetchUrl = () => {
    if (process.env.NODE_ENV !== 'production') {
        return LOCAL_URL
    } else {
        return PROD_URL
    }
}
