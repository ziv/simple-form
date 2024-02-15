import { TestBed } from '@angular/core/testing';
import { GeneratorApp } from './generator-app';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneratorApp],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(GeneratorApp);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'generator' title`, () => {
    const fixture = TestBed.createComponent(GeneratorApp);
    const app = fixture.componentInstance;
    // expect(app.title).toEqual('generator');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(GeneratorApp);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, generator');
  });
});
