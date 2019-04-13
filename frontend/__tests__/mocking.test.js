// Mocking is testing links between code by erasing the actual implementation of a function.
// 

function Person(name, foods) {
  this.name = name;
  this.foods = foods;
}

Person.prototype.fetchFavFoods = function () {
  return new Promise((resolve, reject) => {
    // simulate an API
    setTimeout(() => resolve(this.foods), 2000)
  })
}


describe('mocking learning', () => {
  it('mocks a reg function', () => {
    const fetchDogs = jest.fn();
    fetchDogs('hugo');
    expect(fetchDogs).toHaveBeenCalled();
    expect(fetchDogs).toHaveBeenCalledWith('hugo');
    fetchDogs('hugo');
    expect(fetchDogs).toHaveBeenCalledTimes(2);
  });

  it('can create a person', () => {
    const me = new Person('Cavan', ['steak', 'eggs'])
    expect(me.name).toBe('Cavan')
  });

  it('can fetch foods', async () => {
    const me = new Person('Cavan', ['steak', 'eggs']);
    // mock the favFoods function
    me.fetchFavFoods = jest.fn().mockResolvedValue(
      ['sushi', 'ramen']
    );
    const favFoods = await me.fetchFavFoods();
    expect(favFoods).toContain('sushi')
  })
});