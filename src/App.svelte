<script lang="ts">
    import {
        Button,
        Collapse,
        Divider,
        Flex,
        Modal,
        Paper,
        Stack,
        SvelteUIProvider,
        Switch,
        Textarea,
    } from "@svelteuidev/core";

    import { KeyModel, KeyboardModel } from "./lib/Hamster";

    import Keyboard from "./lib/Keyboard.svelte";
    import KeyEdit from "./lib/KeyEdit.svelte";

    let dark_theme = false;

    let keyTemp: KeyModel = new KeyModel();
    let openKeyTemp: boolean;
    let displaySwipeUp: boolean, displaySwipeDown: boolean;

    let keyboards: KeyboardModel[] = [];
    let add = () => {
        keyboards.push(new KeyboardModel());
        keyboards = keyboards;
    };
    let destroyKdb = (id: number) => {
        let index = keyboards.findIndex((value) => {
            return value.id === id;
        });
        keyboards = keyboards
            .slice(0, index)
            .concat(keyboards.slice(index + 1));
    };

    let json_text: string;
    let yaml_text: string;
    let show_text: boolean;
    let gen = () => {
        json_text = JSON.stringify(keyboards);
        let yaml: string[] = ["keyboards:"];
        for (var keyboard of keyboards) {
            let i = 0;
            for (var line of keyboard.render()) {
                if (i == 0) {
                    line = "  - " + line;
                } else {
                    line = "    " + line;
                }
                yaml.push(line);
                i++;
            }
        }
        yaml_text = yaml.join("\n");
        show_text = true;
    };
    let parse = () => {
        try {
            // 試圖實現 json 數據導入
            let data = JSON.parse(json_text);
        } catch (e) {
            if (e instanceof SyntaxError) {
                console.error(e.message);
            } else {
                throw e;
            }
        }
    };
</script>

<SvelteUIProvider
    withGlobalStyles
    themeObserver={dark_theme ? "dark" : "light"}
>
    <Stack gap="sm">
        <Switch
            bind:checked={dark_theme}
            size="lg"
            label="主題模式"
            onLabel="達客"
            offLabel="明亮"
        />
        <Divider />
        <Button on:click={() => (openKeyTemp = !openKeyTemp)}>按鍵模板</Button>
        <Collapse open={openKeyTemp}>
            <Paper>
                <KeyEdit
                    isTemplate={true}
                    bind:action={keyTemp.action}
                    bind:width={keyTemp.width}
                    bind:label={keyTemp.label}
                    display={keyTemp.label !== ""
                        ? keyTemp.label
                        : keyTemp.action.display()}
                    bind:swipes={keyTemp.swipe}
                    {displaySwipeUp}
                    {displaySwipeDown}
                    destroyThis={() => {}}
                    moveLeft={() => {}}
                    moveRight={() => {}}
                />
            </Paper>
        </Collapse>
        <Divider />
        {#each keyboards as keyboard (keyboard.id)}
            <Keyboard
                {keyTemp}
                destroyThis={() => destroyKdb(keyboard.id)}
                bind:name={keyboard.name}
                bind:rows={keyboard.rows}
                bind:buttonInsets={keyboard.buttonInsets}
            />
            <Divider />
        {/each}
        <Flex gap="sm">
            <Button color="green" on:click={add}>添加鍵盤</Button>
            <Button on:click={gen}>生成配置</Button>
        </Flex>
    </Stack>
    <Modal
        title="生成配置"
        withCloseButton={true}
        opened={show_text}
        on:close={() => (show_text = false)}
        size="75%"
    >
        <Textarea
            style="font-family:monospace;font-size:16px"
            bind:value={json_text}
            on:change={parse}
            label="配置JSON數據"
        />
        <Textarea
            style="font-family:monospace;font-size:16px"
            rows={16}
            value={yaml_text}
            label="配置YAML數據"
        />
    </Modal>
</SvelteUIProvider>
