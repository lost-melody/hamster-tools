<script lang="ts">
    import {
        Button,
        Flex,
        NativeSelect,
        Paper,
        Stack,
        Switch,
        TextInput,
    } from "@svelteuidev/core";
    import { Directions, SwipeModel } from "./Hamster";
    import ActionEdit from "./ActionEdit.svelte";

    export let swipe: SwipeModel;
    let display: string;
    $: if (swipe.label !== "") {
        display = swipe.label;
    } else {
        display = swipe.action.display();
    }

    export let destroyThis: () => void;
</script>

<Paper>
    <Stack>
        <Flex gap="sm">
            <Button on:click={destroyThis} color="red">删除</Button>
            <Switch bind:checked={swipe.display} label="顯示" />
            <Switch bind:checked={swipe.processByRIME} label="經Rime處理" />
        </Flex>
        <Flex gap="sm">
            <NativeSelect
                data={Directions}
                bind:value={swipe.direction}
                label="方向"
            />
            <TextInput
                bind:value={swipe.label}
                override={{ width: "64px" }}
                label="標簽"
                placeholder={display}
            />
            <ActionEdit bind:action={swipe.action} />
        </Flex>
    </Stack>
</Paper>
