<template>
    <div class="">

        <div class="my-5 max-w-[1400px] px-10">

            <div class="flex flex-col sm:flex-row">
                <h1 class="max-w-sm text-3xl font-bold text-blue-900">
                    Đánh giá
                </h1>

            </div>

            <div class="text-gray-700 md:grid grid-cols-2 space-x-5 rounded-xl bg-white shadow p-5 ">

                <div class="my-4 py-2 px-4  w-full  hidden md:block ">
                    <div class="flex h-16 items-center text-2xl font-bold text-blue-900">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-yellow-400" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {{ this.totalCount }} / 5
                    </div>
                </div>

                <ul class="mb-6 mt-2 space-y-2 mr-5 ">
                    <li v-for="rs in rating_statics" class="flex items-center text-sm font-medium">
                        <span class="text-blue-600">{{ rs.star + ' sao' }} </span>
                        <span class="mr-4 text-yellow-400">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <!-- Icon path here -->
                            </svg>
                        </span>
                        <div class="mr-4 h-2 w-96 overflow-hidden rounded-full bg-gray-300">
                            <div :style="{ width: computeWidth(rs.average_score) }" class="h-full bg-yellow-400"></div>
                          
                        </div>
                        
                        <span class="text-blue-600">{{ rs.count }} đánh giá</span>
                    </li>
                </ul>

            </div>

            <button @click="openRating" class="w-36 rounded-full bg-blue-900 py-3 text-white font-medium mt-2">Đánh
                giá</button>
        </div>

        <!-- /list rating -->
            <div  v-for="rating in ratings">
            <div class="py-8 text-left px-4 bg-gray-100 m-2 rounded-xl max-w-[1400px] ">
                <div class="flex items-start">
                    <div class="ml-6">
                        <div class="flex items-center">
                            <StarRating :star-size="30" :read-only="true" :rating=parseFloat(rating.score_rating)
                                :increment="0.1" :star-color="'text-yellow-500'" :empty-star-color="'text-gray-300'" />
                        </div>
                        <p class="mt-5 text-base text-gray-900">{{ rating.comment_rating }}</p>
                        <p class="mt-5 text-sm font-bold text-gray-900">{{ rating.User.fullname }}</p>
                        <p class="mt-1 text-sm text-gray-600">{{ formatCurrentTime(rating.createdAt) }}</p>
                    </div>
                </div>
            </div>
      </div>
    </div>

    <!--popup rating-->
    <div class=" fixed w-full h-full top-0 left-0 flex items-center justify-center z-50 overflow-auto " v-if="isShowRating">
        <div class="absolute w-full h-full bg-gray-900 opacity-50"></div>

        <div class=" bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto ">
            <div class="flex flex-row py-3 px-4">
                <h5 class="text-lg font-semibold flex-grow">Đánh giá khách sạn</h5>
                <button @click="openRating" type="button"
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="default-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>

            <div class="py-4 px-4">
                <StarRating :star-size="30" :increment="0.1" :star-color="'text-yellow-500'"
                    :empty-star-color="'text-gray-300'" v-model:rating="rating" />
                <p class="text-red-500 text-sm ml-1" v-if="!rating && ratingFocused">Vui lòng đánh giá điểm.</p>

            </div>
            <div class="py-4 px-4">
                <textarea class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                    placeholder="Nhập nội dung ..." v-model="content"></textarea>
                <p class="text-red-500 text-sm ml-1" v-if="!content && contentFocused">Hãy chia sẻ trải nghiệm của bạn về khách sạn.</p>

            </div>
            <div class="modal-footer py-3 px-4 ">
                <button class="  py-2 px-4 bg-blue-700 text-white rounded-lg cursor-pointer mr-4" @click="ratingHotel()">Đánh
                    giá</button>
                <button class="  py-2 px-4 bg-blue-700 text-white rounded-lg cursor-pointer"
                    @click="openRating()">Đóng</button>
            </div>
        </div>
    </div>
<!--component toast thông báo !!!-->
<toast ref="toast"></toast>
</template>
<script>
import StarRating from 'vue-star-rating'
import dayjs from 'dayjs';
import toast from '../toast.vue';

export default {
    data() {
        return {
            rating: 0,
            content: '',
            user: '',
            ratingFocused: false,
            contentFocused: false,
            isShowRating: false,
            rating_statics: [],
            ratings: [],
            totalCount: '',
            id_hotel: ''
        };
    },
    mounted() {
        this.user = JSON.parse(localStorage.getItem("User"));
        this.getRating()
    },
    components: { StarRating, toast, },
    methods: {
        openRating() {
            this.isShowRating = !this.isShowRating
        },
        async getRating() {
            try {
                const result = await this.$axios(`rating/get/${this.$route.params.id}`);
                this.rating_statics = result.data.ratingStatistics
                this.totalCount = result.data.overallAverage
                this.ratings = result.data.ratings
            } catch (error) {
                console.log(error)
            }
        },
        computeWidth(count) {
            let a = ((count / this.totalCount) * 100).toFixed(2)
            if(isNaN(a))
            {
                a = 0
            }
            return `${a}px`;
        },
        formatCurrentTime(timeString) {
            return dayjs(timeString).format('MM-DD-YYYY');
        },
        async ratingHotel() {
            this.ratingFocused = true;
            this.contentFocused = true;

            if (this.user.id === null) {
            this.$refs.toast.showToast("Bạn cần đăng nhập để đánh giá");
            return; // Stop further execution
    }
            if (this.rating && this.content) {
                try {
                    const result = await this.$axios.post(`rating/add/${this.user.id}`,
                        {
                            id_hotel: this.$route.params.id,
                            score_rating: this.rating,
                            comment_rating: this.content
                        })

                    this.$refs.toast.showToast(result.data.message);
                    
                    if (result.status === 200) {
                        this.ratingFocused = false;
                        this.contentFocused = false;
                        this.openRating()
                        this.getRating()
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }
    },

};
</script>