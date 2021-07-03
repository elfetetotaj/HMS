import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Test } from "../models/test";

export default class TestStore {
    testRegistry = new Map<string, Test>();
    selectedTest: Test | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }
    get testsByName() {
        return Array.from(this.testRegistry.values()).sort((a, b) => a.cmimi < b.cmimi ? 1:-1);
        
    }
    loadTests = async () => {
        this.loadingInitial = true;
        try {
            const tests = await agent.Tests.list();
                tests.forEach(test => {
                    this.setTest(test);
                })
                this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }
    
    private setTest = (test: Test) => {

        this.testRegistry.set(test.id, test);
    }

    loadTest = async (id: string) => {
        let test = this.getTest(id);
        if (test) {
            this.selectedTest = test;
            return test;
        } else {
            this.loadingInitial = true;
            try {
                test = await agent.Tests.details(id);
                this.setTest(test);
                runInAction(() => {
                    this.selectedTest = test;
                })
                this.setLoadingInitial(false);
                return test;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private getTest = (id: string) => {
        return this.testRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createTest = async (test: Test) => {
        this.loading = true;
        try {
            await agent.Tests.create(test);
            runInAction(() => {
                this.testRegistry.set(test.id, test);
                this.selectedTest = test;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateTest = async (test: Test) => {
        this.loading = true;
        try {
            await agent.Tests.update(test);
            runInAction(() => {
                this.testRegistry.set(test.id, test);
                this.selectedTest = test;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteTest = async (id: string) => {
        this.loading = true;
        try {
            await agent.Tests.delete(id);
            runInAction(() => {
                this.testRegistry.delete(id);
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}

// function b(a: any, b: any) {
//     throw new Error("Function not implemented.");
// }
// function a(a: any, b: (a: any, b: any) => void) {
//     throw new Error("Function not implemented.");
// }

