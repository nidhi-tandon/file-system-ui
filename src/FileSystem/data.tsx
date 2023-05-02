import {FcFile, FcOpenedFolder} from "react-icons/fc";

export type Options = {
    label: string;
    icon: JSX.Element;
    value:  {
        children: Options[]
    } | string;
}
export const options: Options[] = [{
    label: 'src',
    icon: <FcOpenedFolder/>,
    value: {
        children: [
            {
                label: 'App.js',
                value: 'App.js',
                icon: <FcFile/>
            },
            {
                label: 'App.css',
                value: 'App.css',
                icon: <FcFile/>
            },
            {
                label: 'Components',
                icon: <FcOpenedFolder/>,
                value: {
                    children: [
                        {
                            label: 'Menu',
                            icon: <FcOpenedFolder/>,
                            value: {
                                children: [
                                    {
                                        label: 'Menu.ts',
                                        value: 'Menu.ts',
                                        icon: <FcFile/>
                                    }
                                ]
                            }
                        }
                    ]
                }
            }
        ]
    }
}]
