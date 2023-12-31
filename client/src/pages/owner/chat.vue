<template>
    <!-- component -->
    <div class="flex h-screen antialiased text-gray-800">
        <div class="flex flex-row h-full w-full overflow-x-hidden">

            <div class="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">

                <div class="flex flex-col mt-8">
                    <div class="flex flex-row items-center justify-between text-xs">
                        <span class="font-bold">Danh sách chat</span>
                    </div>

                    <div class="flex flex-col space-y-1 mt-4 -mx-2  overflow-y-auto" v-for="room in rooms">
                        <button class="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
                            @click="getHistory(room.id)">
                            <div class="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                                D
                            </div>
                            <div class="ml-2 text-sm font-semibold">{{ room.fullname }}</div>
                        </button>
                    </div>

                </div>
            </div>

            <div class="flex flex-col flex-auto h-full p-6">
                <div class="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
                    <div class="flex flex-col h-full overflow-x-auto mb-4">
                        <div class="flex flex-col h-full">
                            <div class="grid grid-cols-12 gap-y-2" v-for="chat in chats">

                                <!-- phần người gửi tới-->
                                <div class="col-start-1 col-end-8 p-3 rounded-lg" v-if="chat.check_send == 'User'">
                                    <div class="flex flex-row items-center">
                                        <div
                                            class="flex items-center h-10 w-10 justify-center p-2 rounded-full bg-indigo-500 flex-shrink-0">
                                            {{ getInitial(chat.User.fullname) }}
                                        </div>
                                        <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                            <div>{{ chat.messager }}</div>
                                        </div>
                                    </div>
                                </div>

                                <!-- phần bản owner -->
                                <div class="col-start-6 col-end-13 p-3 rounded-lg" v-else>
                                    <div class="flex items-center justify-start flex-row-reverse">
                                        <div class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                                            <div>{{ chat.messager }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- phần gửi tin nhắn -->
                    <div class="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">


                        <div class="flex-grow ml-4">
                            <div class="relative w-full">
                                <input type="text" v-model="messager"
                                    class="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10" />
                            </div>
                        </div>

                        <div class="ml-4">
                            <button @click="addMess()"
                                class="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0">
                                <span>Gửi</span>
                                <span class="ml-2">
                                    <svg class="w-4 h-4 transform rotate-45 -mt-px" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import socketService from '../../plugins/socketService';
import dayjs from 'dayjs';
export default {
    data() {
        return {
            owner: '', chats: [], rooms: [], id_user: '', messager: ''
        };
    },
    mounted() {
        this.owner = JSON.parse(localStorage.getItem("owner"));
        socketService.ownerConnect(this.owner.id)
        this.getRoom()
        socketService.getchat((data) => {
                this.chats.push(data);
        })
    },
    components: {
    },
    methods: {
        getInitial(a) {
            return a.charAt(0);
        },
        async getHistory(id) {
            this.id_user = id
            try {
                const result = await this.$axios.post(`message/getHistory`, {
                    id_user: id,
                    id_owner: this.owner.id
                })
                this.chats = result.data
            } catch (error) {
                console.log(error);
            }
        },
        async getRoom() {
            try {
                const result = await this.$axios.get(`message/getRoom/${this.owner.id}`)
                this.rooms = result.data
            } catch (error) {
                console.log(error)
            }
        },
        async addMess() {
            try {
                const result = await this.$axios.post(`message/add`,
                    {
                        "messager": this.messager,
                        "id_owner": this.owner.id,
                        "id_user": this.id_user,
                        "check_send": "Owner"
                    }
                )
                this.messager = " "
            } catch (error) {
                console.log(error)
            }
        }
    },
};
</script>