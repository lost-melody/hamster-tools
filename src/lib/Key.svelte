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
        ActionType,
        ActionTypes,
        KeyboardType,
        KeyboardTypes,
        ShortCmds,
        WidthTypes,
    } from "./Hamster";
    import { Action, SwipeModel } from "./Hamster";

    export let action: Action;
    export let widthType: string;
    export let width: number;
    export let label: string;
    export let swipe: SwipeModel[];
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
        <Flex gap="sm">
            <NativeSelect
                data={ActionTypes}
                bind:value={action.type}
                label="動作類型"
            />
            <TextInput
                disabled={action.type !== ActionType.character &&
                    action.type !== ActionType.characterMargin &&
                    action.type !== ActionType.symbol &&
                    (action.type !== ActionType.keyboardType ||
                        action.kbd !== KeyboardType.custom)}
                bind:value={action.text}
                label="鍵值"
                placeholder="c"
            />
            <NativeSelect
                disabled={action.type !== ActionType.keyboardType}
                data={KeyboardTypes}
                bind:value={action.kbd}
                label="鍵盤類型"
            />
            <NativeSelect
                disabled={action.type !== ActionType.shortCommand}
                data={ShortCmds}
                bind:value={action.cmd}
                label="快捷指令"
            />
        </Flex>
        <Flex gap="sm">
            <NativeSelect
                data={WidthTypes}
                bind:value={widthType}
                label="鍵寛類型"
            />
            <NumberInput
                bind:value={width}
                required
                label="寛度值"
                placeholder="1"
                precision={2}
                min={0.01}
                step={0.05}
            />
        </Flex>
        <Flex gap="sm">
            <TextInput bind:value={label} label="標簽" placeholder={display} />
        </Flex>
        <Flex gap="sm">
            <Button on:click={destroyThis} color="red">删除鍵</Button>
            <Button on:click={moveLeft}>左移</Button>
            <Button on:click={moveRight}>右移</Button>
        </Flex>
    </Stack>
</Modal>
