<template>
  <!--button call chat-->
  <button
    @click="
      openMess();
      getHistory(id);
    "
    class="fixed z-[200] bottom-4 right-4 inline-flex items-center justify-center text-sm font-medium disabled:pointer-events-none disabled:opacity-50 border rounded-full w-16 h-16 bg-black hover:bg-gray-700 m-0 cursor-pointer border-gray-200 bg-none p-0 normal-case leading-5 hover:text-gray-900"
    type="button"
    aria-haspopup="dialog"
    aria-expanded="false"
    data-state="closed"
  >
    <svg
      xmlns=" http://www.w3.org/2000/svg"
      width="30"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="text-white block border-gray-200 align-middle"
    >
      <path
        d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"
        class="border-gray-200"
      ></path>
    </svg>
  </button>

  <div
    class="fixed md:right-20 right-0 bottom-0 z-30 w-80 h-96 flex flex-col border shadow-md bg-white"
    v-if="isShowMess"
  >
    <div class="flex items-center justify-between border-b p-2">
      <!-- user info -->
      <div class="flex items-center">
        <div class="pl-2">Tin nhắn</div>
      </div>

      <!-- end user info -->

      <!-- chat box action -->
      <div>
        <button
          @click="openMess"
          class="inline-flex hover:bg-indigo-50 rounded-full p-2"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <!-- end chat box action -->
    </div>

    <!--noi dung cuoc tro chuyen-->
    <div
      class="flex flex-col h-full mb-4 overflow-x-auto overflow-y-auto"
      ref="chatContainer"
    >
      <div class="flex flex-col h-full">
        <div class="grid grid-cols-12 gap-y-2" v-for="chat in chats">
          <!--nguoi gui-->
          <div
            class="col-start-1 col-end-8 p-3 rounded-lg"
            v-if="chat.check_send == 'Owner'"
          >
            <div class="flex flex-row items-center">
              <div class="flex items-center justify-center">
                <p class="h-10 w-10 rounded-full bg-blue-400 text-center">
                  {{ getInitial(chat.owner.fullname) }}
                </p>
              </div>

              <div
                class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
              >
                <div>{{ chat.messager }}</div>
                <div class="pl-4 flex items-center justify-center">
                  <small class="text-gray-500">{{
                    formatTime(chat.createdAt)
                  }}</small>
                </div>
              </div>
            </div>
          </div>

          <!--người nhận-->
          <div class="col-start-6 col-end-13 p-3 rounded-lg" v-else>
            <div class="flex items-center justify-start flex-row-reverse">
              <div
                class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl flex"
              >
                <div>{{ chat.messager }}</div>
                <div class="pl-4 flex items-center justify-center">
                  <small class="text-gray-500">{{
                    formatTime(chat.createdAt)
                  }}</small>
                </div>
                <div
                  class="text-rose-200 cursor-pointer ml-2"
                  @click="
                    onclosedelete();
                    sendata(chat);
                  "
                  v-if="chat.check_send == 'User'"
                >
                  X
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--noi dung cuoc tro chuyen-->

    <!--footer chat-->
    <div
      class="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4 mb-2"
    >
      <!--input thêm tin nhắn-->
      <div class="flex-grow ml-4">
        <div class="relative w-full">
          <textarea
            type="text"
            v-model="messager"
            v-on:keyup.enter="addMess(id)"
            class="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10 text-base"
          ></textarea>
        </div>
      </div>
      <!--button send tin nhắn-->
      <div class="ml-4">
        <button
          @click="addMess(id)"
          class="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
        >
          <span>Gửi</span>
          <span class="ml-2">
            <svg
              class="w-4 h-4 transform rotate-45 -mt-px"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              ></path>
            </svg>
          </span>
        </button>
      </div>
    </div>
  </div>

  <!--delete-->
  <div
    class="fixed w-full h-full top-0 left-0 flex items-center justify-center z-50"
    v-show="isShowdelete"
  >
    <div
      class="absolute w-full h-full bg-gray-900 opacity-50"
      @click="onclosedelete"
    ></div>

    <div
      class="bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto"
    >
      <div class="flex flex-row py-3 px-4">
        <h5 class="text-lg font-semibold flex-grow">Xóa tin nhắn</h5>
        <i
          class="uil-multiply flex-none cursor-pointer bg-gray-400 rounded-xl"
          @click="onclosedelete"
        ></i>
      </div>
      <div class="px-4">
        <div>
          <label class="block mb-2 text-sm font-medium text-gray-900"
            >Bạn có muốn xóa ?
          </label>
        </div>
      </div>
      <div class="py-3 px-4">
        <button
          class="py-2 px-4 bg-gradient-to-r text-white bg-red-600 rounded-lg hover:bg-red-700 cursor-pointer mr-4"
          @click="deleteMessage()"
        >
          Xóa
        </button>
        <button
          class="py-2 px-4 bg-gradient-to-r text-white bg-gray-600 rounded-lg hover:bg-gray-700 cursor-pointer"
          @click="onclosedelete()"
        >
          Đóng
        </button>
      </div>
    </div>
  </div>
  <toast ref="toast"></toast>
</template>

<script>
import dayjs from "dayjs";
import socketService from "../../plugins/socketService";
import toast from "../toast.vue";
export default {
  props: ["id"],
  data() {
    return {
      isShowMess: false,
      id_owner: "",
      isShowdelete: false,
      user: "",
      chats: [],
      messager: "",
      chat: null,
    };
  },
  mounted() {
    this.id_owner = this.id;
    this.user = JSON.parse(localStorage.getItem("User"));
    socketService.getchat((data) => {
      if (this.id_owner == data.owner.id && this.user.id == data.User.id) {
        this.chats.push(data);
        this.$nextTick(() => {
          const chatContainer = this.$refs.chatContainer;
          chatContainer.scrollTop = chatContainer.scrollHeight;
        });
      }
    });
    socketService.getdelete((data) => {
      if (this.id_owner == data.id_owner && this.user.id == data.id_user) {
        for (let i = 0; i < this.chats.length; i++) {
          if (this.chats[i].id == data.id) {
            this.chats.splice(i, 1);
            break;
          }
        }
      }
    });
  },
  components: { toast },
  methods: {
    openMess() {
      if (this.user) {
        this.isShowMess = !this.isShowMess;
      } else {
        this.$refs.toast.showToast("Vui lòng đăng nhập để sử dụng chức năng.");
      }
    },
    getInitial(a) {
      return a.charAt(0);
    },
    onclosedelete() {
      this.isShowdelete = !this.isShowdelete;
    },
    formatTime(timeString) {
      return dayjs(timeString).format("HH:mm");
    },
    async getHistory(id) {
      this.id_owner = id;
      try {
        const result = await this.$axios.post(`message/getHistory`, {
          id_user: this.user.id,
          id_owner: id,
        });
        this.chats = result.data;
        this.$nextTick(() => {
          const chatContainer = this.$refs.chatContainer;
          chatContainer.scrollTop = chatContainer.scrollHeight;
        });
      } catch (error) {
        console.log(error);
      }
    },
    async addMess(id) {
      try {
        if (this.messager == "") {
          return;
        } else {
          const result = await this.$axios.post(`message/add`, {
            messager: this.messager,
            id_owner: id,
            id_user: this.user.id,
            check_send: "User",
          });
          this.messager = " ";
          this.$nextTick(() => {
            const chatContainer = this.$refs.chatContainer;
            chatContainer.scrollTop = chatContainer.scrollHeight;
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    sendata(c) {
      this.chat = c;
    },
    async deleteMessage() {
      try {
        const result = await this.$axios.delete(
          "message/delete/" + this.chat.id
        );
        if (result.status == 200) {
          this.onclosedelete();
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
