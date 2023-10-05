<script lang="ts">
    import {
        ActionIcon,
        Button,
        Flex,
        NumberInput,
        Paper,
    } from "@svelteuidev/core";
    import Icon from "@iconify/svelte";

    import { KeyModel } from "./Hamster";

    import Key from "./Key.svelte";

    export let keyTemp: KeyModel;
    export let keys: KeyModel[];
    export let rowHeight: number;
    export let destroyThis: () => void;
    export let displaySwipeUp: boolean, displaySwipeDown: boolean;

    let add = () => {
        keys.push(keyTemp.clone());
        keys = keys;
    };
    let destroyKey = (id: number) => {
        let index = keys.findIndex((value) => {
            return value.id === id;
        });
        keys = keys.slice(0, index).concat(keys.slice(index + 1));
    };
    let moveKeyLeft = (id: number) => {
        let index = keys.findIndex((value) => {
            return value.id === id;
        });
        if (index > 0) {
            [keys[index - 1], keys[index]] = [keys[index], keys[index - 1]];
        }
    };
    let moveKeyRight = (id: number) => {
        let index = keys.findIndex((value) => {
            return value.id === id;
        });
        if (index < keys.length) {
            [keys[index + 1], keys[index]] = [keys[index], keys[index + 1]];
        }
    };

    $: _rowHeight = (rowHeight > 0 ? rowHeight : 32) + "px";
</script>

<Paper>
    <Flex gap="sm" override={{ height: _rowHeight }}>
        <ActionIcon
            override={{ height: _rowHeight, width: "32px" }}
            on:click={destroyThis}
            color="red"
        >
            <Icon width="100%" icon="mdi:table-row-remove" />
        </ActionIcon>
        <NumberInput
            hideControls
            override={{
                height: _rowHeight,
                width: "64px",
            }}
            bind:value={rowHeight}
            placeholder="行高"
            min={0}
        />
        {#each keys as key (key.id)}
            <Key
                {displaySwipeUp}
                {displaySwipeDown}
                destroyThis={() => destroyKey(key.id)}
                moveLeft={() => moveKeyLeft(key.id)}
                moveRight={() => moveKeyRight(key.id)}
                bind:action={key.action}
                bind:width={key.width}
                bind:label={key.label}
                bind:swipes={key.swipe}
                {rowHeight}
            />
        {/each}
        <ActionIcon
            override={{ height: _rowHeight, width: "32px" }}
            color="green"
            on:click={add}
        >
            <Icon width="100%" icon="mdi:plus-box" />
        </ActionIcon>
    </Flex>
</Paper>
