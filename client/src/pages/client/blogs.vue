<template>
    <div class=" max-w-screen-2xl mx-auto px-4 py-8 sm:px-6 lg:px-8 mt-[100px] h-full ">
        <div class="grid sm:grid-cols-2 md:grid-cols-3 items-center grid-cols-1">
            <div class="" v-for="item in items">
                <blog class="p-2 m-1" :id="item.id" :title="item.title" :description="item.description" :date="item.date" :img="item.img" />
            </div>
        </div>
    </div>
</template>

<script>
import blog from '../../components/client/blog.vue';
export default {
    data() {
        return {
            items: [
                { id: 1, title: 'Title 1', description: 'Description 1', date: '2023-12-15', img:'https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645.jpg'},
                { id: 2, title: 'Title 2', description: 'Description 2', date: '2023-12-16', img:'https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645.jpg'},
                { id: 3, title: 'Title 3', description: 'Description 2', date: '2023-12-16', img:'https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645.jpg'},
                { id: 1, title: 'Title 1', description: 'Description 1', date: '2023-12-15', img:'https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645.jpg'},
                { id: 2, title: 'Title 2', description: 'Description 2', date: '2023-12-16', img:'https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645.jpg'},
                { id: 3, title: 'Title 3', description: 'Description 2', date: '2023-12-16', img:'https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645.jpg'},
            ]
        };
    },
    mounted() {

    },
    components: { blog },
    methods: {

    },
};
</script>