<script lang="ts">
    import { Button, Modal } from "@svelteuidev/core";

    import { Action, SwipeModel, KeyWidth } from "./Hamster";
    import KeyEdit from "./KeyEdit.svelte";

    export let action: Action;
    export let width: KeyWidth;
    export let label: string;
    export let swipes: SwipeModel[];
    export let rowHeight: number;
    export let displaySwipeUp: boolean, displaySwipeDown: boolean;
    export let destroyThis: () => void;
    export let moveLeft: () => void;
    export let moveRight: () => void;

    let display: string;
    $: if (label !== "") {
        display = label;
    } else {
        display = action.display();
    }

    let editing = false;

    $: buttonStyle = {
        height: (rowHeight === 0 ? 32 : rowHeight) + "px",
        width: width.pixels() + "px",
    };
</script>

<Button override={buttonStyle} on:click={() => (editing = true)}
    >{display}</Button
>
<Modal
    size="xl"
    title="按鍵配置"
    withCloseButton={true}
    on:close={() => (editing = false)}
    opened={editing}
>
    <KeyEdit
        bind:action
        bind:width
        bind:label
        {display}
        bind:swipes
        {displaySwipeUp}
        {displaySwipeDown}
        {destroyThis}
        {moveLeft}
        {moveRight}
    />
</Modal>
