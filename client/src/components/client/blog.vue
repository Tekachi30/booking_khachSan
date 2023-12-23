<template>
    <article class="overflow-hidden rounded-lg shadow transition hover:shadow-lg">
        <img alt="Office"
            :src=img
            class="h-56 w-full object-cover" />

        <div class="bg-white p-4 sm:p-6">
            <time datetime="2022-10-10" class="block text-xs text-gray-500"> {{ date }}</time>

            <a >
                <h3 class="mt-0.5 text-lg text-gray-900">{{ title }}</h3>
            </a>

            <p class="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                {{ description }}
            </p>
        </div>
    </article>
</template>
    
<script>
export default {
    props: ['title', 'description', 'date','img','id'],
    data() {
        return {
            
        };
    },
    mounted() {

    },
    components: {},
    methods: {

    },
};
</script>