<script lang="ts">
    import { Flex, NativeSelect, TextInput } from "@svelteuidev/core";
    import {
        ActionType,
        ActionTypes,
        KeyboardType,
        KeyboardTypes,
        ShortCmds,
    } from "./Hamster";
    import { Action } from "./Hamster";

    export let action: Action;
</script>

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
