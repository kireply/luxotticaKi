define(function() {

	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {
          
          // IMPORTED CODE
          this.view.preShow = () => {
            voltmx.print('simpleSwitch: preShow ith the following config ....' + JSON.stringify(baseConfig, ' ', 3));
            this.initDone = true;
            this.setLayout();
          };
          
          this.view.doLayout = (theObject) => {
            voltmx.print('simpleSwitch: Widget.doLayout....');
            this.setDimensions(this.view.height);
          };
          
          this.view.flxCircle.doLayout= (theObject) => {
            voltmx.print('simpleSwitch: flxCircle.doLayout....');
          };

		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {
            defineGetter(this, 'state', () => {
                return this._state;
            });
            defineSetter(this, 'state', value => {
              voltmx.print('simpleSwitch: state SETTER: ' + value);
              this._state = value;
              this.initDone = true;  // added again (didn't work inside Tab otherwise)
              this.initDone && this.setLayout();
            });
            defineGetter(this, 'onSkin', () => {
                return this._onSkin;
            });
            defineSetter(this, 'onSkin', value => {
              voltmx.print('simpleSwitch: onSkin SETTER : ' + value);
              this._onSkin = value;  
              this.setLayout();
            });
            defineGetter(this, 'offSkin', () => {
                return this._offSkin;
            });
            defineSetter(this, 'offSkin', value => {
              voltmx.print('simpleSwitch: offSkin SETTER : ' + value);
              this._offSkin = value;
              this.setLayout();
            });
            defineGetter(this, 'circleSkin', () => {
                return this._circleSkin;
            });
            defineSetter(this, 'circleSkin', value => {
              voltmx.print('simpleSwitch: circleSkin SETTER : ' + value);
              this._circleSkin = value;
              this.setLayout();
            });
        },

      // se sono definite le onSkin e OffSkin, allora la skin di tutto il componente è o quella on o quella off (a seconda dello stato)
      setLayout() {

        if (this.onSkin && this.offSkin) this.view.skin = this._state ? this.onSkin : this.offSkin;
        if (this.circleSkin) this.view.flxCircle.skin = this.circleSkin;
        this.view.flxCircle.left = this._state ? null : '1dp';
        this.view.flxCircle.right = this._state ? '1dp': null;
        this.view.forceLayout();
      },
      
      setDimensions(value) {

        voltmx.print('simpleSwitch: in setDimensions .... for value : ' + value + ', (' + typeof(value) + ')');
        
        const height = this.view.frame.height;
        const width = height * 2;
        this.view.width = `${width}dp`;
		/*
        if (typeof(value) === 'string') value = parseInt(value.replace('dp', ''));
        this.view.width = 2 * value + 2 + 'dp';
        this.view.flxCircle.height = value - 4 + 'dp';
        this.view.flxCircle.width = this.view.flxCircle.height;
        this.view.lblOn.width = value - 4 + 'dp';
        this.view.lblOn.fontSize = value * 2;
        this.view.lblOff.width = value - 4 + 'dp';
        this.view.lblOff.fontSize = value * 2;
        */
        this.view.forceLayout();
        
      }

      
      
      
      
	};
});