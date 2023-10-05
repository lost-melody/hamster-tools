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

    $: displayInput =
        action.type === ActionType.character ||
        action.type === ActionType.characterMargin ||
        action.type === ActionType.symbol ||
        (action.type === ActionType.keyboardType &&
            action.kbd === KeyboardType.custom);
</script>

<Flex gap="sm">
    <NativeSelect
        data={ActionTypes}
        bind:value={action.type}
        label="動作類型"
    />
    {#if action.type === ActionType.keyboardType}
        <NativeSelect
            data={KeyboardTypes}
            bind:value={action.kbd}
            label="鍵盤類型"
        />
    {/if}
    {#if displayInput}
        <TextInput
            bind:value={action.text}
            override={{ width: "64px" }}
            label="鍵值"
            placeholder="c"
        />
    {/if}
    {#if action.type === ActionType.shortCommand}
        <NativeSelect
            data={ShortCmds}
            bind:value={action.cmd}
            label="快捷指令"
        />
    {/if}
</Flex>
