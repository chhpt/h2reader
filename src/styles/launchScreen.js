import Colors from './Colors';
import Metrics from './Metrics';

const LaunchScreen = {
  sectionText: {
    color: Colors.coal,
    backgroundColor: Colors.ricePaper,
    padding: Metrics.smallMargin,
    marginTop: Metrics.smallMargin,
    marginHorizontal: Metrics.baseMargin,
    borderWidth: 1,
    borderColor: Colors.ember,
    alignItems: 'center',
    textAlign: 'center'
  },
  launchTitle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  launchTitleText: {
    color: Colors.coal,
    fontSize: 32,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: Colors.ember,
    lineHeight: 60,
    padding: 40,
    alignItems: 'center',
    textAlign: 'center'
  }
};

export default LaunchScreen;

