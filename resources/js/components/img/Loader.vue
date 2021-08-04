<template>
    <div class="snippet" data-title=".dot-pulse">
        <div class="stage">
            <div class="top">
                <logo-svg />
            </div>
            <div class="bot">
                <div class="dot-pulse mb-5"></div>
                <h4 class="mt-5">{{ randomLoadingQuote }}</h4>
            </div>
        </div>
    </div>
</template>

<script>
import LogoSVG from './LogoSVG.vue';

export default {
    components: { 
        'logo-svg' :LogoSVG,
    },
    data() {
        return {
            loaderArray: ['Se incarca carul cu boi', 'Se incarca carul cu fan', 'Trece un nouras pe sus 1', 'Trece un nouras pe sus 2', 'Trece un nouras pe sus 13']
        }
    },
    computed: {
        randomLoadingQuote() {
            return  _.sample(this.loaderArray)
        },
    }

    //
}
</script>

<style lang="scss" scoped>
    .snippet {
        position: fixed;
        background: #fff;
        margin: 1.5rem 0;
        // box-shadow: 0 .4rem .8rem -.1rem rgba(0, 32, 128, .1), 0 0 0 1px #f0f2f7;
        border-radius: .25rem;
        bottom: 0;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
    }

    .stage {
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative;
            padding: 2rem 0;
            margin: 0 -5%;
            overflow: hidden;
            height: 60%;
            flex-direction: column;

        // >div {

        // }

        .bot {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        // .top {

        // }
    }


    /**
 * ==============================================
 * Dot Pulse
 * ==============================================
 */
    .dot-pulse {
        position: relative;
        left: -10021px;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: #9880ff;
        color: #9880ff;
        box-shadow: 10014px 0 0 -5px #9880ff;
        animation: dotPulse 1.5s infinite linear;
        animation-delay: .25s;
    }

    .dot-pulse::before,
    .dot-pulse::after {
        content: '';
        display: inline-block;
        position: absolute;
        top: 0;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: #9880ff;
        color: #9880ff;
    }

    .dot-pulse::before {
        box-shadow: 9984px 0 0 -5px #9880ff;
        animation: dotPulseBefore 1.5s infinite linear;
        animation-delay: 0s;
    }

    .dot-pulse::after {
        box-shadow: 10044px 0 0 -5px #9880ff;
        animation: dotPulseAfter 1.5s infinite linear;
        animation-delay: .5s;
    }

    @keyframes dotPulseBefore {
        0% {
            box-shadow: 9984px 0 0 -5px #9880ff;
        }

        30% {
            box-shadow: 9984px 0 0 2px #9880ff;
        }

        60%,
        100% {
            box-shadow: 9984px 0 0 -5px #9880ff;
        }
    }

    @keyframes dotPulse {
        0% {
            box-shadow: 10014px 0 0 -5px #9880ff;
        }

        30% {
            box-shadow: 10014px 0 0 2px #9880ff;
        }

        60%,
        100% {
            box-shadow: 10014px 0 0 -5px #9880ff;
        }
    }

    @keyframes dotPulseAfter {
        0% {
            box-shadow: 10044px 0 0 -5px #9880ff;
        }

        30% {
            box-shadow: 10044px 0 0 2px #9880ff;
        }

        60%,
        100% {
            box-shadow: 10044px 0 0 -5px #9880ff;
        }
    }

</style>
