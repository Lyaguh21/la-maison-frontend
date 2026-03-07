import { useIngredientsQuery } from "@/entities/menu/api/menuApi";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/entities/user/api/userApi";
import { useNotifications } from "@/shared/lib";

import {
  TextInput,
  Button,
  Fieldset,
  PillsInput,
  Pill,
  Group,
  Combobox,
  CheckIcon,
  useCombobox,
  Text,
  LoadingOverlay,
  Input,
} from "@mantine/core";

import { useEffect, useState } from "react";
import { IMaskInput } from "react-imask";

export default function ProfileForm() {
  const { showError, showSuccess } = useNotifications();
  const { data: ALL_ALLERGENS } = useIngredientsQuery();
  const { data: profile } = useGetProfileQuery();
  const [updateProfile] = useUpdateProfileMutation();
  const [name, setName] = useState<undefined | string>(undefined);
  const [phone, setPhone] = useState<undefined | string>(undefined);
  const [selectedAllergenIds, setSelectedAllergenIds] = useState<number[]>([
    1, 3,
  ]);
  const [search, setSearch] = useState("");

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex("active"),
  });

  useEffect(() => {
    setPhone(profile?.phone || undefined);
    setName(profile?.name || undefined);
    setSelectedAllergenIds(profile?.userAllergens?.map((a) => a.id) || []);
  }, [profile]);

  if (!ALL_ALLERGENS) {
    return <LoadingOverlay />;
  }

  const handleAllergenToggle = (id: number) => {
    setSelectedAllergenIds((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id],
    );
  };

  const handleAllergenRemove = (id: number) => {
    setSelectedAllergenIds((prev) => prev.filter((v) => v !== id));
  };

  const selectedAllergens = ALL_ALLERGENS.filter((a) =>
    selectedAllergenIds.includes(a.id),
  );

  const filteredOptions = ALL_ALLERGENS.filter((a) =>
    a.name.toLowerCase().includes(search.trim().toLowerCase()),
  );

  const pills = selectedAllergens?.map((a) => (
    <Pill
      key={a.id}
      withRemoveButton
      onRemove={() => handleAllergenRemove(a.id)}
    >
      {a.name}
    </Pill>
  ));

  const options = filteredOptions.map((a) => (
    <Combobox.Option
      value={String(a.id)}
      key={a.id}
      active={selectedAllergenIds.includes(a.id)}
    >
      <Group gap="sm">
        {selectedAllergenIds.includes(a.id) && <CheckIcon size={12} />}
        <span>{a.name}</span>
      </Group>
    </Combobox.Option>
  ));

  const handleSave = async () => {
    try {
      await updateProfile({
        name,
        phone,
        userAllergenIds: selectedAllergenIds,
      }).unwrap();
      showSuccess("Профиль успешно обновлен");
    } catch (error: any) {
      showError(error.message || "Не удалось обновить профиль");
    }
  };

  return (
    <Fieldset
      legend={
        <Text fw={600} fz="lg">
          Основная информация
        </Text>
      }
      radius="md"
      p="xl"
    >
      <TextInput
        label="Email"
        placeholder="Введите email"
        value={profile?.email || ""}
        mb="md"
        minLength={2}
        disabled
      />

      <TextInput
        label="Имя"
        placeholder="Введите имя"
        value={name ?? ""}
        onChange={(e) => setName(e.currentTarget.value)}
        mb="md"
        minLength={2}
      />

      <Input
        type="tel"
        mask="+70000000000"
        component={IMaskInput}
        label="Телефон"
        placeholder="+79999999999"
        value={phone ?? ""}
        onChange={(e) => setPhone(e.currentTarget.value)}
        mb="md"
        rightSection={
          phone !== undefined ? (
            <Input.ClearButton onClick={() => setPhone(undefined)} />
          ) : undefined
        }
      />

      <Combobox
        store={combobox}
        onOptionSubmit={(val) => {
          handleAllergenToggle(Number(val));
          setSearch("");
        }}
      >
        <Combobox.DropdownTarget>
          <PillsInput
            label="Аллергены"
            onClick={() => combobox.openDropdown()}
            mb="xl"
          >
            <Pill.Group>
              {pills}
              <Combobox.EventsTarget>
                <PillsInput.Field
                  onFocus={() => combobox.openDropdown()}
                  onBlur={() => combobox.closeDropdown()}
                  value={search}
                  placeholder={
                    selectedAllergens?.length === 0
                      ? "Выберите аллергены"
                      : undefined
                  }
                  onChange={(event) => {
                    combobox.updateSelectedOptionIndex();
                    setSearch(event.currentTarget.value);
                  }}
                  onKeyDown={(event) => {
                    if (
                      event.key === "Backspace" &&
                      search.length === 0 &&
                      selectedAllergenIds.length > 0
                    ) {
                      handleAllergenRemove(
                        selectedAllergenIds[selectedAllergenIds.length - 1],
                      );
                    }
                  }}
                />
              </Combobox.EventsTarget>
            </Pill.Group>
          </PillsInput>
        </Combobox.DropdownTarget>

        <Combobox.Dropdown>
          <Combobox.Options mah={200} style={{ overflowY: "auto" }}>
            {options?.length > 0 ? (
              options
            ) : (
              <Combobox.Empty>Ничего не найдено</Combobox.Empty>
            )}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>

      <Button color="burgundy.6" radius="md" onClick={handleSave}>
        Сохранить изменения
      </Button>
    </Fieldset>
  );
}
