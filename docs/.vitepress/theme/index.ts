import DefaultTheme from 'vitepress/theme'

import { onMounted, watch, nextTick } from 'vue';
import { useRoute } from 'vitepress';

// https://juejin.cn/post/7133165263767207966
import './style/var.css'

import mediumZoom from 'medium-zoom';
import './style/mediumZoom.css'

export default {
    extends: DefaultTheme,

    setup() {
        const route = useRoute();
        const initZoom = () => {
            // mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' }); // 默认
            mediumZoom('.main img', { background: 'var(--vp-c-bg)' }); // 不显式添加{data-zoomable}的情况下为所有图像启用此功能
        };
        onMounted(() => {
            initZoom();
        });
        watch(
            () => route.path,
            () => nextTick(() => initZoom())
        );
    },
}
