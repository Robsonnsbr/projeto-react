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
        useCallback(
            (e) => {
                if (e.key === "Enter") {
                    if (e.currentTarget.value.trim().length === 0) return;
                    const value = e.currentTarget.value;
                    e.currentTarget.value = "";
                    if (lista.some((listItem) => listItem.title === value))
                        return;
                    TarefasService.create({
                        title: value,
                        isCompleted: false,
                    }).then((result) => {
                        if (result instanceof ApiException) {
                            alert(result.message);
                        } else {
                            setLista((oldLista) => {
                                return [...oldLista, result];
                            });
                        }
                    });
                }
            },
            [lista]
        );

    const handleDelete = useCallback((id: number) => {
        TarefasService.deleteById(id).then((result) => {
            if (result instanceof ApiException) {
                alert(result.message);
            } else {
                setLista((oldLista) => {
                    return oldLista.filter(
                        (oldListItem) => oldListItem.id !== id
                    );
                });
            }
        });
    }, []);
    const handleToggleCompleted = useCallback(
        (id: number) => {
            const tarefaToUpdate = lista.find(
                (tarefa: ITarefa) => tarefa.id === id
            );
            if (!tarefaToUpdate) return;

            TarefasService.updateById(id, {
                ...tarefaToUpdate,
                isCompleted: !tarefaToUpdate.isCompleted,
            }).then((result) => {
                if (result instanceof ApiException) {
                    alert(result.message);
                } else {
                    setLista((oldLista) => {
                        return oldLista.map((oldListItem) => {
                            if (oldListItem.id === id) return result;
                            return oldListItem;
                        });
                    });
                }
            });
        },
        [lista]
    );

    return (
        <div>
            <p>Lista</p>

            <input onKeyDown={handleInputKeyDown} />

            <p>{lista.filter((listItem) => listItem.isCompleted).length}</p>

            <div>
                <ul>
                    {lista.map((listItem) => (
                        <li key={listItem.id}>
                            <input
                                type="checkbox"
                                checked={listItem.isCompleted}
                                onChange={() => {
                                    handleToggleCompleted(listItem.id);
                                }}
                            />
                            {listItem.title}
                            <button onClick={() => handleDelete(listItem.id)}>
                                APAGAR
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
