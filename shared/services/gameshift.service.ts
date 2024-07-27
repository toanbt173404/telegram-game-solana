import { AxiosInstance } from 'axios';
import { createAxiosInstance } from '../utils/axios';

const GAME_SHIFT_URL = 'https://api.gameshift.dev/nx';
const COLLECTION_ID = "d2492cbb-5958-45ef-a433-e078d798b499"

class GameShiftService {
    private axiosGameShift: AxiosInstance;

    constructor() {
        this.axiosGameShift = createAxiosInstance(GAME_SHIFT_URL, {
            'x-api-key':
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIyNDVmYjY0MS0wZDdjLTRjYWUtYmNmNS0xZTM1ODUzNjAxNjAiLCJzdWIiOiI1MDM2OWU0NS1hYTA0LTQwMzYtOGZlMC02ZWMzMTcwOTZlOGMiLCJpYXQiOjE3MjE5OTA3OTl9.a3bYWfzaHtuNrii-XBozcrfh-NKMEJ1ec2d_eW_sjS4',
        });
    }

    async createUser(email: string) {
        return await this.axiosGameShift.post(GAME_SHIFT_URL + '/users', {
            email,
            referenceId: email,
        });
    }

    async submitToLeaderBoard(score: number, referenceId: string) {

        const data = {
            details: {
              collectionId: COLLECTION_ID,
              description: '2048 High Scores',
              imageUrl: 'https://solana.com/src/img/branding/solanaLogoMark.png',
              name: '2048 High Scores',
              attributes: [
                {
                  traitType: 'score',
                  value: score.toString(),
                },
              ],
            },
            destinationUserReferenceId: referenceId,
          };

        return await this.axiosGameShift.post(GAME_SHIFT_URL + '/unique-assets', 
            data
        );
    }

    async fetchLeaderBoard() {

        const params =  {
            collectionId: COLLECTION_ID
        }
        return await this.axiosGameShift.get(GAME_SHIFT_URL + '/items', 
          
        );
    }


    async fetchUser(referenceId: string) {

        const params = {
            referenceId
        }
        return await this.axiosGameShift.get(
            GAME_SHIFT_URL + `/users/${referenceId}`
        );
    }

    async fetchUserWallet(referenceId: string) {

        return await this.axiosGameShift.get(
            GAME_SHIFT_URL + `/users/${referenceId}/wallet-address`
        );
    }
}

export default new GameShiftService();
