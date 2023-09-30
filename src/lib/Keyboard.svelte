<script lang="ts">
    import { Button, Flex, Paper, Stack, TextInput } from "@svelteuidev/core";

    import { RowModel } from "./Hamster";

    import Row from "./Row.svelte";

    export let name: string;
    export let rows: RowModel[];
    export let rowHeight: number;
    export let buttonInsets: number | string;
    export let destroyThis: () => void;

    let add = () => {
        rows.push(new RowModel());
        rows = rows;
    };
    let destroyRow = (id: number) => {
        let index = rows.findIndex((value) => {
            return value.id === id;
        });
        rows = rows.slice(0, index).concat(rows.slice(index + 1));
    };
</script>

<Paper>
    <Stack gap="sm">
        <Flex gap="sm" align="center">
            <Button on:click={destroyThis} color="red">删除鍵盤</Button>
            <TextInput
                required
                bind:value={name}
                label="鍵盤名"
                placeholder="天行鍵"
            />
            <!--
            <TextInput bind:value={rowHeight} label="行高" placeholder="0" />
            -->
            <TextInput
                bind:value={buttonInsets}
                label="内距"
                placeholder="3 或 left(3),right(3),top(3),bottom(3)"
            />
        </Flex>
        {#each rows as row (row.id)}
            <Row
                destroyThis={() => destroyRow(row.id)}
                bind:keys={row.keys}
                bind:rowHeight={row.rowHeight}
            />
        {/each}
        <Button color="green" on:click={add}>添加新行</Button>
    </Stack>
</Paper>
