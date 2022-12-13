import { API_INITIAL_STATE } from '@models/api.interface';
import { of } from 'rxjs';
import { ApiStore } from './api.store';

// * Is an INTEGRATION test
// * The BaseStore class is not mocked

describe('The ApiStore ', () => {
  // * prefer well named types and variables with realistic values
  type Trip = { destination: string; startDate: Date; price: number };
  let tripsApiStore: ApiStore<Trip>;
  let trips: Trip[];
  describe('Wrapping the BaseStore ', () => {
    beforeEach(() => {
      // *  Arrange before each test
      tripsApiStore = new ApiStore<Trip>();
      trips = [
        {
          destination: 'The Moon',
          startDate: new Date('2023-02-23'),
          price: 100,
        },
      ];
    });
    // * be descriptive with test names
    it('should create an instance without arguments', () => {
      expect(new ApiStore<Trip>()).toBeTruthy();
    });
    it('should have an initial state', () => {
      // *  Be descriptive with variable names
      tripsApiStore.selectState$().subscribe((tripsApiState) => {
        expect(tripsApiState).toEqual(API_INITIAL_STATE);
      });
    });
    it('should set is working state to true', () => {
      // ToDo: student exercise
      tripsApiStore.setIsWorking();
      tripsApiStore.selectState$().subscribe((tripsApiState) => {
        expect(tripsApiState.isWorking).toEqual(true);
      });
    });
    it('should set a trips array', () => {
      tripsApiStore.setData(trips);
      tripsApiStore.selectState$().subscribe((tripsApiState) => {
        expect(tripsApiState.data).toEqual(trips);
      });
    });
    it('should add a new trip', () => {
      // ToDo: student exercise
      tripsApiStore.setData(trips);
      const newTrip = {
        destination: 'Mars',
        startDate: new Date('2024-02-24'),
        price: 200,
      };
      tripsApiStore.addItem(newTrip);
      tripsApiStore.selectState$().subscribe((tripsApiState) => {
        const expected = [...trips, newTrip];
        expect(tripsApiState.data).toEqual(expected);
      });
    });
  });

  // ! session 2
  // ! Is an UNIT test
  // ! The BaseStore class is now doubled

  describe('Spying the BaseStore dependency use', () => {
    // * the BaseStore double will be used to spy on the BaseStore methods
    // * typed as any to avoid TS complaining
    let baseStoreSpy: any;
    beforeEach(() => {
      tripsApiStore = new ApiStore<Trip>();
      // * create a spy object for the BaseStore with the methods we want to spy on
      baseStoreSpy = jasmine.createSpyObj('BaseStore', ['setState']);
      // * replace the BaseStore with the spy (even though it is private)
      tripsApiStore['baseStore'] = baseStoreSpy;
    });
    it('should call setState when setIsWorking', () => {
      tripsApiStore.setIsWorking();
      expect(tripsApiStore['baseStore'].setState).toHaveBeenCalled();
    });
    it('should call setState correctly when setIsWorking', () => {
      // ToDo: student exercise
      tripsApiStore.setIsWorking();
      const setStateSpy = tripsApiStore['baseStore'].setState;
      expect(setStateSpy).toHaveBeenCalledTimes(1);
      expect(setStateSpy).toHaveBeenCalledWith({ isWorking: true, error: '' });
    });
  });
  describe('Stubbing the BaseStore dependency use', () => {
    // * the BaseStore double will be used to stub predefined return values
    let baseStoreStub: any;
    beforeEach(() => {
      tripsApiStore = new ApiStore<Trip>();
      baseStoreStub = jasmine.createSpyObj('BaseStore', ['select$']);
      tripsApiStore['baseStore'] = baseStoreStub;
    });
    it('should return an observable with initial state', () => {
      // * arrange method with stubbed return values
      baseStoreStub.select$ = jasmine
        .createSpy()
        .and.returnValue(of(API_INITIAL_STATE));
      tripsApiStore.selectState$().subscribe((tripsApiState) => {
        expect(tripsApiState).toEqual(API_INITIAL_STATE);
      });
    });
  });
});
