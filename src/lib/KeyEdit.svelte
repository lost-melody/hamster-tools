<script lang="ts">
    import {
        Button,
        Flex,
        NativeSelect,
        NumberInput,
        Stack,
        TextInput,
    } from "@svelteuidev/core";
    import Icon from "@iconify/svelte";

    import {
        Action,
        Direction,
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
    export let display: string;
    export let swipes: SwipeModel[];
    export let displaySwipeUp: boolean, displaySwipeDown: boolean;
    export let isTemplate: boolean = false;
    export let destroyThis: () => void;
    export let moveLeft: () => void;
    export let moveRight: () => void;

    let add = (dir: Direction) => {
        if (dir === Direction.up) {
            swipes.push(new SwipeModel(dir, displaySwipeUp));
        } else {
            swipes.push(new SwipeModel(dir, displaySwipeDown));
        }
        swipes = swipes;
    };
    let destroySwipe = (id: number) => {
        let index = swipes.findIndex((value) => {
            return value.id === id;
        });
        swipes = swipes.slice(0, index).concat(swipes.slice(index + 1));
    };
</script>

<Stack>
    <Flex gap="sm">
        <ActionEdit bind:action />
        <NativeSelect
            data={WidthTypes}
            bind:value={width.type}
            label="鍵寛類型"
        />
        {#if width.type !== WidthType.input && width.type !== WidthType.available}
            <NumberInput
                bind:value={width.width}
                override={{ width: "96px" }}
                required
                label="寛度值"
                placeholder="1"
                precision={2}
                min={0.01}
                max={100}
                step={0.05}
            />
        {/if}
        <TextInput
            override={{ width: "64px" }}
            bind:value={label}
            label="標簽"
            placeholder={display}
        />
    </Flex>
    <Stack>
        {#each swipes as swipe (swipe.id)}
            <SwipeEdit bind:swipe destroyThis={() => destroySwipe(swipe.id)} />
        {/each}
        <Flex gap="sm">
            <Button color="green" on:click={() => add(Direction.up)}>
                <Icon slot="leftIcon" width="20" icon="mdi:gesture-swipe-up" />
                上滑
            </Button>
            <Button color="green" on:click={() => add(Direction.down)}>
                <Icon
                    slot="leftIcon"
                    width="20"
                    icon="mdi:gesture-swipe-down"
                />
                下滑
            </Button>
        </Flex>
    </Stack>
    {#if !isTemplate}
        <Flex gap="sm">
            <Button on:click={destroyThis} color="red">
                <Icon slot="leftIcon" width="20" icon="mdi:card-remove" />
                删除按鍵
            </Button>
            <Button on:click={moveLeft}>
                <Icon slot="leftIcon" width="20" icon="mdi:arrow-left-circle" />
                左移
            </Button>
            <Button on:click={moveRight}>
                <Icon
                    slot="rightIcon"
                    width="20"
                    icon="mdi:arrow-right-circle"
                />
                右移
            </Button>
        </Flex>
    {/if}
</Stack>
