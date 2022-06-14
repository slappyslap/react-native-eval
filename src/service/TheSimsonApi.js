class TheSimsonApi {

    baseUrl = "https://thesimpsonsquoteapi.glitch.me/quotes"

    getRandomQuotes() {
        return fetch(this.baseUrl, {method: 'get'})
            .then((result) => {
                return result.json().then((data) => {
                    return data[0]
                })
            })
    }
}

export default new TheSimsonApi();