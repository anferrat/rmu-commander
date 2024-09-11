import { TestRepo } from "./TestRepo"
import { SiteStatus } from "../../../constants/constants"

export class TestApiRepo extends TestRepo {
    private test_database = {
        user: { firstName: 'Test', lastName: 'User', id: 'test_user_id' },
        companies: [{
            id: 'test_company_id',
            name: 'Test Company',
            groups: [
                {
                    name: 'My Group',
                    id: 'my_group_id',
                    sites: [
                        {
                            id: 'site_1',
                            name: 'Site 1',
                            status: SiteStatus.ON,
                            onFirst: true,
                            on: null,
                            off: null
                        },
                        {
                            id: 'site_2',
                            name: 'Site 2',
                            status: SiteStatus.ON,
                            onFirst: true,
                            on: null,
                            off: null
                        }
                    ]
                },
                {
                    name: 'Your group',
                    id: 'my_group_id_2',
                    sites: [
                        {
                            id: 'site_3',
                            name: 'Site 3',
                            status: SiteStatus.ON,
                            onFirst: true,
                            on: null,
                            off: null
                        },
                        {
                            id: 'site_4',
                            name: 'Site 4',
                            status: SiteStatus.ON,
                            onFirst: true,
                            on: null,
                            off: null
                        }
                    ]
                }
            ]
        }],
        commands: []
    }

    constructor() {
        super()
    }

    userInfo(){
    }

}