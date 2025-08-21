import React from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
    restrictToVerticalAxis,
    restrictToParentElement,
} from '@dnd-kit/modifiers';
import RankingItem from './RankingItem';
import styles from './RankingList.module.scss';

const RankingList = ({ animes, onReorder, onRemove, editable = false }) => {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            const oldIndex = animes.findIndex((anime) => anime.id === active.id);
            const newIndex = animes.findIndex((anime) => anime.id === over.id);

            onReorder(arrayMove(animes, oldIndex, newIndex));
        }
    };

    if (animes.length === 0) {
        return null;
    }

    return (
        <div className={styles.rankingList}>
            {editable ? (
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                    modifiers={[restrictToVerticalAxis, restrictToParentElement]}
                >
                    <SortableContext
                        items={animes.map(anime => anime.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        {animes.map((anime, index) => (
                            <RankingItem
                                key={anime.id}
                                anime={anime}
                                position={index + 1}
                                onRemove={onRemove}
                                editable={editable}
                            />
                        ))}
                    </SortableContext>
                </DndContext>
            ) : (
                animes.map((anime, index) => (
                    <RankingItem
                        key={anime.id}
                        anime={anime}
                        position={index + 1}
                        onRemove={onRemove}
                        editable={editable}
                    />
                ))
            )}
        </div>
    );
};

export default RankingList;
