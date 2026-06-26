import type { Letter, LetterFormData } from 'src/types/letter';
import type { Organization, OrganizationFormData } from 'src/types/organization';

import {
  useMemo,
  useState,
  useContext,
  useCallback,
  createContext,
  type ReactNode,
} from 'react';

import { _letters } from 'src/_mock/_letters';
import { _organizations } from 'src/_mock/_organizations';

// ----------------------------------------------------------------------

type DataContextValue = {
  letters: Letter[];
  organizations: Organization[];
  getLetter: (id: string) => Letter | undefined;
  getOrganization: (id: string) => Organization | undefined;
  getOrganizationName: (id: string) => string;
  addLetter: (data: LetterFormData) => Letter;
  updateLetter: (id: string, data: LetterFormData) => void;
  deleteLetter: (id: string) => void;
  addOrganization: (data: OrganizationFormData) => Organization;
  updateOrganization: (id: string, data: OrganizationFormData) => void;
  deleteOrganization: (id: string) => void;
};

const DataContext = createContext<DataContextValue | null>(null);

// ----------------------------------------------------------------------

let idCounter = 1000;

function generateId() {
  idCounter += 1;
  return `local-${idCounter}-${Date.now()}`;
}

// ----------------------------------------------------------------------

type DataProviderProps = {
  children: ReactNode;
};

export function DataProvider({ children }: DataProviderProps) {
  const [letters, setLetters] = useState<Letter[]>(_letters);
  const [organizations, setOrganizations] = useState<Organization[]>(_organizations);

  const getLetter = useCallback(
    (id: string) => letters.find((letter) => letter.id === id),
    [letters]
  );

  const getOrganization = useCallback(
    (id: string) => organizations.find((org) => org.id === id),
    [organizations]
  );

  const getOrganizationName = useCallback(
    (id: string) => organizations.find((org) => org.id === id)?.name ?? '—',
    [organizations]
  );

  const addLetter = useCallback((data: LetterFormData) => {
    const newLetter: Letter = {
      ...data,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    setLetters((prev) => [newLetter, ...prev]);
    return newLetter;
  }, []);

  const updateLetter = useCallback((id: string, data: LetterFormData) => {
    setLetters((prev) =>
      prev.map((letter) => (letter.id === id ? { ...letter, ...data } : letter))
    );
  }, []);

  const deleteLetter = useCallback((id: string) => {
    setLetters((prev) => prev.filter((letter) => letter.id !== id));
  }, []);

  const addOrganization = useCallback((data: OrganizationFormData) => {
    const newOrg: Organization = { ...data, id: generateId() };
    setOrganizations((prev) => [...prev, newOrg]);
    return newOrg;
  }, []);

  const updateOrganization = useCallback((id: string, data: OrganizationFormData) => {
    setOrganizations((prev) =>
      prev.map((org) => (org.id === id ? { ...org, ...data } : org))
    );
  }, []);

  const deleteOrganization = useCallback((id: string) => {
    setOrganizations((prev) => prev.filter((org) => org.id !== id));
  }, []);

  const value = useMemo(
    () => ({
      letters,
      organizations,
      getLetter,
      getOrganization,
      getOrganizationName,
      addLetter,
      updateLetter,
      deleteLetter,
      addOrganization,
      updateOrganization,
      deleteOrganization,
    }),
    [
      letters,
      organizations,
      getLetter,
      getOrganization,
      getOrganizationName,
      addLetter,
      updateLetter,
      deleteLetter,
      addOrganization,
      updateOrganization,
      deleteOrganization,
    ]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

// ----------------------------------------------------------------------

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
}
