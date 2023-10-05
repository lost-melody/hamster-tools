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
    import Icon from "@iconify/svelte";

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
            <Text>鍵盤名:</Text>
            <TextInput
                required
                bind:value={name}
                override={{ width: "96px" }}
                placeholder="天行鍵"
            />
            <Button on:click={() => switchDisplaySwipe(Direction.up)}>
                <Icon
                    slot="leftIcon"
                    width="20"
                    icon={displaySwipeUp ? "mdi:eye-off" : "mdi:eye"}
                />
                {displaySwipeUp ? "隐藏所有上滑" : "顯示所有上滑"}
            </Button>
            <Button on:click={() => switchDisplaySwipe(Direction.down)}>
                <Icon
                    slot="leftIcon"
                    width="20"
                    icon={displaySwipeUp ? "mdi:eye-off" : "mdi:eye"}
                />
                {displaySwipeDown ? "隐藏所有下滑" : "顯示所有下滑"}
            </Button>
            <Text>内距:</Text>
            <TextInput
                bind:value={buttonInsets}
                override={{ width: "96px" }}
                placeholder="3 或 left(3),right(3),top(3),bottom(3)"
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
        <Flex gap="sm" align="center">
            <Button color="green" on:click={add}>
                <Icon
                    slot="leftIcon"
                    width="20"
                    icon="mdi:table-row-plus-after"
                />
                新增一行
            </Button>
            <Button on:click={destroyThis} color="red">
                <Icon slot="leftIcon" width="20" icon="mdi:keyboard-off" />
                删除鍵盤
            </Button>
        </Flex>
    </Stack>
</Paper>
