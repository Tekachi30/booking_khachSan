<template>
   
    <!-- component -->
    <div class="flex flex-row h-screen w-full antialiased text-gray-800 bg-gray-100 rounded-xl shadow-xl">
        <div class="flex flex-row w-96 flex-shrink-0  p-4">
            <div class="flex flex-col w-full h-full pl-4 pr-4 py-4 -mr-4">
                <div class="flex flex-row items-center">
                    <div class="flex flex-row items-center">
                        <div class="text-xl font-semibold">404ViVu</div>
                    </div>
                </div>
                <div class="mt-2" v-for="room in rooms">
                    <div class="flex flex-col -mx-4 cursor-pointer" @click="getHistory(room.id);sendRoom(room)">
                        <!--list room-->
                        <div 
                            class=" flex flex-row items-center p-4 bg-gradient-to-r from-red-100 to-transparent border-l-2 border-red-500">
                            <div
                                class="flex items-center justify-center h-10 w-10 rounded-full bg-pink-500 text-pink-300 font-bold flex-shrink-0">
                                {{ getInitial(room.fullname) }}
                            </div>

                            <div class="flex flex-col flex-grow ml-3">
                                <div class="flex items-center">
                                    <div class="text-sm font-medium">{{ room.fullname }}</div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-col h-full w-full bg-white px-4 py-6">
            <!--header :))-->
            
            <div class="flex flex-row items-center py-4 px-6 rounded-2xl shadow" v-if="user_room != null">
                <div class="flex items-center justify-center h-10 w-10 rounded-full bg-pink-500 text-pink-100">
                    {{ getInitial(user_room.fullname) }}
                </div>
                <div class="flex flex-col ml-3">
                    <div class="font-semibold text-sm">{{ user_room.fullname}}</div>
                </div>
            </div>
            
            <!-- nôi dung tin nhan -->
            <div class="h-full overflow-hidden py-4"  >
                <div class="h-full overflow-y-auto " ref="chatContainer">
                    <div class="grid grid-cols-12 gap-y-2" v-for="chat in chats">
                        <!--user nhan-->
                       <div class="col-start-1 col-end-8 p-3 rounded-lg" v-if="chat.check_send == 'User'">
                            <div class="flex flex-row items-center">
                                <div
                                    class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                    {{ getInitial(chat.User.fullname) }}
                                </div>
                                <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                    <div>{{ chat.messager }}</div>
                                </div>
                            </div>
                        </div>

                        <!--owner tra loi-->
                        <div class="col-start-6 col-end-13 p-3 rounded-lg" v-else>
                            <div class="flex items-center justify-start flex-row-reverse">
                                <div class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                                    <div>
                                        {{ chat.messager }}
                                    </div>
                                </div>
                            </div>
                        </div>

                        
                    </div>
                </div>
            </div>
            
            <!--phan input gui tin nhan :))-->
            <div class="flex flex-row items-center">
                <div class="flex flex-row items-center w-full border rounded-3xl h-12 px-2">
                    
                    <div class="w-full">
                        <input type="text" v-model="messager"  v-on:keyup.enter="addMess()"
                            class="border border-transparent w-full focus:outline-none text-sm h-10 flex items-center"
                            placeholder="Nhập nội dung tin nhắn....">
                    </div>                 
                </div>
                <div class="ml-6">
                    <button @click="addMess()"
                        class="flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 hover:bg-gray-300 text-indigo-800">
                        <svg class="w-5 h-5 transform rotate-90 -mr-px" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                        </svg>
                    </button>
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
            owner: '', chats: [], rooms: [], id_user: '', messager: '',user_room:null
        };
    },
    mounted() {
        this.owner = JSON.parse(localStorage.getItem("owner"));
        socketService.ownerConnect(this.owner.id)
        this.getRoom()
        socketService.getchat((data) => {
            if (this.owner.id == data.owner.id && this.id_user == data.User.id) {
                this.chats.push(data);
                this.$nextTick(() => {
                    const chatContainer = this.$refs.chatContainer
                    chatContainer.scrollTop = chatContainer.scrollHeight
                })
            }
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
                this.$nextTick(() => {

                    const chatContainer = this.$refs.chatContainer
                    chatContainer.scrollTop = chatContainer.scrollHeight
                })
            } catch (error) {
                console.log(error);
            }
        },
        sendRoom(room)
        {
            this.user_room = room
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
                if(this.messager == '')
                {
                    return;
                }
                else
                {
                    const result = await this.$axios.post(`message/add`,
                    {
                        "messager": this.messager,
                        "id_owner": this.owner.id,
                        "id_user": this.id_user,
                        "check_send": "Owner"
                    }
                )
                this.messager = " "
                this.$nextTick(() => {

                    const chatContainer = this.$refs.chatContainer
                    chatContainer.scrollTop = chatContainer.scrollHeight
                })
                }
                
            } catch (error) {
                console.log(error)
            }
        }
    },
};
</script>