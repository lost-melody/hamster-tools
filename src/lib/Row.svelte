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
</script>

<Paper>
    <Flex gap="sm">
        <Button on:click={destroyThis} color="red">删除行</Button>
        <NumberInput
            bind:value={rowHeight}
            label="行高"
            placeholder="1"
            min={0}
        />
    </Flex>
    <Flex gap="sm">
        {#each keys as key (key.id)}
            <Key
                bind:action={key.action}
                bind:widthType={key.widthType}
                bind:width={key.width}
                bind:label={key.label}
                bind:swipe={key.swipe}
            />
        {/each}
        <Button color="green" on:click={add}>+</Button>
    </Flex>
</Paper>
