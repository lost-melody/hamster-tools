<script lang="ts">
    import { Button, Flex, NumberInput, Paper } from "@svelteuidev/core";

    import { KeyModel } from "./Hamster";

    import Key from "./Key.svelte";

    export let keys: KeyModel[];
    export let rowHeight: number;
    export let destroyThis: () => void;

    let add = () => {
        keys.push(new KeyModel());
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

    $: rowStyle = {
        height: (rowHeight === 0 ? 32 : rowHeight) + "px",
    };
    $: inputStyle = {
        width: "64px",
    };
</script>

<Paper>
    <Flex gap="sm" override={rowStyle}>
        <Button override={rowStyle} on:click={destroyThis} color="red">X</Button
        >
        <NumberInput
            override={inputStyle}
            bind:value={rowHeight}
            placeholder="行高"
            min={0}
        />
        {#each keys as key (key.id)}
            <Key
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
        <Button override={rowStyle} color="green" on:click={add}>+</Button>
    </Flex>
</Paper>
