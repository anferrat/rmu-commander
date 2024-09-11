import { AccessToken } from "../../entities/AccessToken"
import { AntiforgeryResponse } from "../../entities/AntiforgeryResponse"
import { TestRepo } from "./TestRepo"

export class AuthTestRepository extends TestRepo {
    private testAccessToken = new AccessToken(
        'eyJhbGciOiJSUzI1NiIsImtpZCI6IkhlbGxvIiwidHlwIjoiSldUIn0.eyJuYmYiOjE3MjYwODczNDQsImV4cCI6NDEyNDczNzAwMCwiaXNzIjoiaHR0cHM6Ly9hY2NvdW50LmNvcnZpZXcuY2xvdWQiLCJhdWQiOiJjb3JWaWV3U3BhIiwibm9uY2UiOiJub25jZSIsImlhdCI6MCwiYXRfaGFzaCI6Imhhc2giLCJzX2hhc2giOiJzaGFzaCIsInNpZCI6Im5vdF9teV9zZXNzaW9uX2lkIiwic3ViIjoidGVzdF91c2VyIiwiYXV0aF90aW1lIjowLCJpZHAiOiJsb2NhbCIsImFtciI6WyJwd2QiXX0.HayF5d9EBDtTO_R_Tx4Lry6-n0uH6prxEzvL_VDFjKJav2IvjpKA_hH0g_vOW31_WWSptVxFJVEhuIhAZ4KpmDHacEYFk7DdM38CQq8sDUFjv7d1pjtgSjY0ogeWvhlML9rEn-wqSbprvETQa3hHhXwHnFeTa5H7bd7XT5VXUJQ',
        'ACCESS_TOKEN',
        99999999
    )
    private DEFAULT_CODE = 'CODE'

    constructor() {
        super()
    }

    antiforgeryRequest(): Promise<AntiforgeryResponse> {
        return this._getDelayed<AntiforgeryResponse>(() => new AntiforgeryResponse(false, null))
    }

    loginRequest(): Promise<unknown> {
        return this._getDelayed<unknown>(() => { })
    }

    authorizeRequest(): Promise<String> {
        return this._getDelayed(() => this.DEFAULT_CODE)
    }

    tokenRequest(): Promise<AccessToken> {
        return this._getDelayed(() => this.testAccessToken)
    }

    logout(): Promise<unknown> {
        return this._getDelayed(() => { })
    }



}