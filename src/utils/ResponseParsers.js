export class ResponseParser {

    static parse422Response(response) {
        return response.data.result
    }
}
