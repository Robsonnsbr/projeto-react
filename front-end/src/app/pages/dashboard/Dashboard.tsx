import { useCallback, useEffect, useState } from "react";
import { ApiException, ITarefa, TarefasService } from "../../shared/services";

export const Dashboard = () => {
    const [lista, setLista] = useState<ITarefa[]>([]);

    useEffect(() => {
        TarefasService.getAll().then((result) => {
            if (result instanceof ApiException) {
                alert(result.message);
            } else {
                setLista(result);
            }
        });
    }, []);

    const handleInputKeyDown: React.KeyboardEventHandler<HTMLInputElement> =
        useCallback((e) => {
            if (e.key === "Enter") {
                if (e.currentTarget.value.trim().length === 0) return;
                const value = e.currentTarget.value;
                e.currentTarget.value = "";

                setLista((oldLista) => {
                    if (oldLista.some((listItem) => listItem.title === value))
                        return oldLista;
                    return [
                        ...oldLista,
                        {
                            id: oldLista.length, //TODO: utilizar o oldLista.length como id? mesmo que seja um quebra galho que sentido faz?
                            title: value,
                            isCompleted: false,
                        },
                    ];
                });
            }
        }, []);

    return (
        <div>
            <p>Lista</p>

            <input onKeyDown={handleInputKeyDown} />

            <p>{lista.filter((listItem) => listItem.isCompleted).length}</p>

            <ul>
                {lista.map((listItem) => (
                    <li key={listItem.id}>
                        <input
                            type="checkbox"
                            checked={listItem.isCompleted}
                            onChange={() => {
                                setLista((oldLista) => {
                                    return oldLista.map((oldListItem) => {
                                        const newIsCompleted =
                                            oldListItem.title === listItem.title
                                                ? !oldListItem.isCompleted
                                                : oldListItem.isCompleted;
                                        return {
                                            ...oldListItem,
                                            isCompleted: newIsCompleted,
                                        };
                                    });
                                });
                            }}
                        />
                        {listItem.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};
