<script lang="ts">
    import {
        Button,
        Flex,
        Paper,
        Stack,
        Switch,
        Text,
        TextInput,
    } from "@svelteuidev/core";

    import { Direction, KeyModel, RowModel } from "./Hamster";

    import Row from "./Row.svelte";

    export let keyTemp: KeyModel;
    export let name: string;
    export let rows: RowModel[];
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

    let displaySwipeUp = false;
    let displaySwipeDown = false;
    let switchDisplaySwipe = (dir: Direction) => {
        let display: boolean;
        if (dir === Direction.up) {
            displaySwipeUp = !displaySwipeUp;
            display = displaySwipeUp;
        } else {
            displaySwipeDown = !displaySwipeDown;
            display = displaySwipeDown;
        }
        rows.forEach((row) => {
            row.keys.forEach((key) => {
                key.swipe.forEach((swipe) => {
                    if (swipe.direction === dir) {
                        swipe.display = display;
                    }
                });
            });
        });
    };
</script>

<Paper>
    <Stack gap="sm">
        <Flex gap="sm" align="center">
            <Button on:click={destroyThis} color="red">删除鍵盤</Button>
            <Text>鍵盤名:</Text>
            <TextInput
                required
                bind:value={name}
                override={{ width: "96px" }}
                placeholder="天行鍵"
            />
            <Text>内距:</Text>
            <TextInput
                bind:value={buttonInsets}
                override={{ width: "96px" }}
                placeholder="3 或 left(3),right(3),top(3),bottom(3)"
            />
            <Switch
                on:change={() => switchDisplaySwipe(Direction.up)}
                label="所有上滑"
                onLabel="顯示"
                offLabel="隐藏"
            />
            <Switch
                on:change={() => switchDisplaySwipe(Direction.down)}
                label="所有下滑"
                onLabel="顯示"
                offLabel="隐藏"
            />
        </Flex>
        {#each rows as row (row.id)}
            <Row
                {keyTemp}
                {displaySwipeUp}
                {displaySwipeDown}
                destroyThis={() => destroyRow(row.id)}
                bind:keys={row.keys}
                bind:rowHeight={row.rowHeight}
            />
        {/each}
        <Button color="green" on:click={add}>添加新行</Button>
    </Stack>
</Paper>
