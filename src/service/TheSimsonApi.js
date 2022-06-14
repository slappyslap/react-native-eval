class TheSimsonApi {

    baseUrl = "https://thesimpsonsquoteapi.glitch.me/quotes"



    getRandomQuotes(number = 1) {
        return fetch(`${this.baseUrl}?count=${number}`, {method: 'get'})
            .then((result) => {
                return result.json().then((data) => {
                    return data
                })
            })
    }
}

export default new TheSimsonApi();