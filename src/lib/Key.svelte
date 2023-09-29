<script lang="ts">
    import {
        Button,
        Flex,
        Modal,
        NativeSelect,
        NumberInput,
        Stack,
        TextInput,
    } from "@svelteuidev/core";

    import {
        Action,
        SwipeModel,
        KeyWidth,
        WidthType,
        WidthTypes,
    } from "./Hamster";
    import ActionEdit from "./ActionEdit.svelte";
    import SwipeEdit from "./SwipeEdit.svelte";

    export let action: Action;
    export let width: KeyWidth;
    export let label: string;
    export let swipes: SwipeModel[];
    export let destroyThis: () => void;
    export let moveLeft: () => void;
    export let moveRight: () => void;

    let add = () => {
        swipes.push(new SwipeModel());
        swipes = swipes;
    };
    let destroySwipe = (id: number) => {
        let index = swipes.findIndex((value) => {
            return value.id === id;
        });
        swipes = swipes.slice(0, index).concat(swipes.slice(index + 1));
    };

    let display: string;
    $: if (label !== "") {
        display = label;
    } else {
        display = action.display();
    }

    let editing = false;
</script>

<Button on:click={() => (editing = true)}>{display}</Button>
<Modal
    size="xl"
    title="按鍵配置"
    withCloseButton={true}
    on:close={() => (editing = false)}
    opened={editing}
>
    <Stack>
        <ActionEdit bind:action />
        <Flex gap="sm">
            <NativeSelect
                data={WidthTypes}
                bind:value={width.type}
                label="鍵寛類型"
            />
            <NumberInput
                disabled={width.type === WidthType.input ||
                    width.type === WidthType.available}
                bind:value={width.width}
                required
                label="寛度值"
                placeholder="1"
                precision={2}
                min={0.01}
                max={100}
                step={0.05}
            />
        </Flex>
        <Flex gap="sm">
            <TextInput bind:value={label} label="標簽" placeholder={display} />
        </Flex>
        <Stack>
            {#each swipes as swipe (swipe.id)}
                <SwipeEdit
                    bind:swipe
                    destroyThis={() => destroySwipe(swipe.id)}
                />
            {/each}
            <Button color="green" on:click={add}>+</Button>
        </Stack>
        <Flex gap="sm">
            <Button on:click={destroyThis} color="red">删除按鍵</Button>
            <Button on:click={moveLeft}>左移</Button>
            <Button on:click={moveRight}>右移</Button>
        </Flex>
    </Stack>
</Modal>
